import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import {
  deleteMediaFromCloudinary,
  deleteVideoFromCloudinary,
  uploadMedia,
} from "../utils/cloudinary.js";

export const createCourse = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;
    if (!courseTitle || !category) {
      return res.status(400).json({
        success: false,
        message: "Course title and category are required",
      });
    }

    const course = await Course.create({
      courseTitle,
      category,
      creator: req.id,
    });

    return res.status(201).json({
      course,
      message: "Course created.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create course",
    });
  }
};

//learn to use nested populate too
// const user = await User.findById(userId)
//     .populate({
//       path: "profile", // Populate the 'profile' field in 'User'
//       populate: {
//         path: "role", // Populate the 'role' field in 'Profile'
//       },
//     });

export const searchCourse = async (req, res) => {
  try {
    let { query = "", categories = [], sortByPrice = "" } = req.query;
    //create search query
    const searchCriteria = {
      isPublished: true,
      $or: [
        { courseTitle: { $regex: query, $options: "i" } },
        { subTitle: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    };

    // Convert categories to an array if it is a string
    if (typeof categories === "string") {
      categories = categories.split(",").map((category) => category.trim());
    }

    categories.forEach((category) => {
      searchCriteria.$or.push({
        category: { $regex: category, $options: "i" },
      });
    });

    console.log(categories);
    

    //define sorting order
    const sortOptions = {};
    if (sortByPrice === "low") {
      sortOptions.coursePrice = 1; //sort by price in ascending order
    } else if (sortByPrice === "high") {
      sortOptions.coursePrice = -1;
    }

    let courses = await Course.find(searchCriteria)
      .populate({ path: "creator", select: "name photUrl" })
      .sort(sortOptions);

    return res.status(200).json({
      success: true,
      courses: courses || [],
    });
  } catch (error) {
    console.log(error);
  }
};

export const getPublishedCourse = async (_, res) => {
  try {
    const courses = await Course.find({ isPublished: true }).populate({
      path: "creator",
      select: "name photoUrl",
    });
    if (!courses) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    return res.status(200).json({
      courses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get published courses",
    });
  }
};

export const getAllAdminCourse = async (req, res) => {
  try {
    const userId = req.id;
    const courses = await Course.find({ creator: userId });
    if (!courses) {
      return res.staus(404).json({
        courses: [],
        message: "Course not found.",
      });
    }

    return res.status(200).json({
      courses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get course",
    });
  }
};

export const editCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
    } = req.body;

    const thumbnail = req.file;

    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    let courseThumbnail;
    if (thumbnail) {
      if (course.courseThumbnail) {
        const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
        await deleteMediaFromCloudinary(publicId); //delet old image
      }
      //upload a thumbnail on cloudinary
      courseThumbnail = await uploadMedia(thumbnail.path);
    }

    ///Update data
    const updateData = {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
      courseThumbnail: courseThumbnail?.secure_url,
    };

    course = await Course.findByIdAndUpdate(courseId, updateData, {
      new: true,
    });

    return res.status(200).json({
      course,
      message: "Course update successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update",
    });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found!",
      });
    }

    return res.status(200).json({
      course,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get course by id",
    });
  }
};

export const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const { courseId } = req.params;

    if (!lectureTitle || !courseId) {
      return res.status(400).json({
        message: "Lecture title and course id is required",
      });
    }

    console.log(req.body);

    //create lecture
    const lecture = await Lecture.create({
      lectureTitle,
    });

    const course = await Course.findById(courseId);
    if (course) {
      course.lectures.push(lecture._id);
      await course.save();
    }

    return res.status(201).json({
      lecture,
      message: "Lecture created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create Lecture",
    });
  }
};

export const getLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate("lectures");
    if (!course) {
      return res.status(404).json({
        message: "Failed to get lectures",
      });
    }

    return res.status(200).json({
      lectures: course.lectures,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get Lecture",
    });
  }
};

export const editLecture = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;
    const { lectureTitle, videoInfo, isPreviewFree } = req.body;
    console.log(isPreviewFree);

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found",
      });
    }

    //update lecture
    if (lectureTitle) lecture.lectureTitle = lectureTitle;
    if (videoInfo?.videoUrl) lecture.videoUrl = videoInfo.videoUrl;
    if (videoInfo?.publicId) lecture.publicId = videoInfo.publicId;
    lecture.isPreviewFree = isPreviewFree;

    await lecture.save();

    //Ensure the course still has the lecture id if its not already added ;
    const course = await Course.findById(courseId);
    if (course && !course.lectures.includes(lecture._id)) {
      course.lectures.push(lecture._id);
      await course.save();
    }

    return res.status(200).json({
      lecture,
      message: "Lecture upadted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update lecture",
    });
  }
};

export const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findByIdAndDelete(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found",
      });
    }

    //delet the lecture form cloudinary as well
    if (lecture.publicId) {
      await deleteVideoFromCloudinary(lecture.publicId);
    }

    //Remove the lecture reference from the associated course
    const course = await Course.findOneAndUpdate(
      { lectures: lectureId }, // Find the course containing the lecture
      { $pull: { lectures: lectureId } }, // Remove the lecture ID from the array
      { new: true } // Return the updated document
    );

    if (course.lectures.length === 0) {
      course.isPublished = false;
      course.save();
    }

    return res.status(200).json({
      message: "Lectures removed successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to remove lecture",
    });
  }
};

export const getLectureById = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found",
      });
    }

    return res.status(200).json({
      lecture,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get lecture by ID",
    });
  }
};

//publish unpublish  course logic
export const togglePublishCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { publish } = req.query; //true,false
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    //publish status based on query parameter
    course.isPublished = publish === "true";
    await course.save();

    const statusMessage = course.isPublished ? "Published" : "Unpublished";
    return res.status(200).json({
      message: `Course is ${statusMessage}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to publish lexture",
    });
  }
};

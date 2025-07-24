import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCreateLectureMutation,
  useGetLectureQuery,
} from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Lecture from "./Lecture";

const CreateLecture = () => {
  const { courseId } = useParams();
  const [lectureTitle, setLectureTitle] = useState("");
  const navigate = useNavigate();

  const [createLecture, { data, isLoading, isSuccess, error }] =
    useCreateLectureMutation();

  const {
    data: lectureData,
    isLoading: lectureLoading,
    error: lectureError,
  } = useGetLectureQuery(courseId);

  const createLectureHandler = async () => {
    await createLecture({ courseId, lectureTitle });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
    }

    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, error]);

  console.log(lectureData);

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Lets add lectures, add some basic course details for your new lecture
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt,
          vero?
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            name="lectureTitle"
            placeholder="Your Lecture name"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
          ></Input>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/course/${courseId}`)}
          >
            Back to course
          </Button>
          <Button disabled={isLoading} onClick={createLectureHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Create lecture
              </>
            ) : (
              "Create"
            )}
          </Button>
        </div>
        <div className="mt-10">
          {lectureLoading ? (
            <LoadingSpinner />
          ) : lectureError ? (
            <p>Failed to load lecture</p>
          ) : lectureData.lectures.length === 0 ? (
            <p>No lectures available</p>
          ) : (
            lectureData.lectures.map((lecture, index) => (
              <Lecture
                key={lecture._id}
                lecture={lecture}
                courseId={courseId}
                index={index}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;

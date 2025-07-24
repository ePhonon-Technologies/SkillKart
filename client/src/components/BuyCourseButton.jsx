import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { useCreateCheckoutSessionMutation } from "@/features/api/purchaseApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const BuyCourseButton = ({ courseId }) => {
  const [createCheckoutSession, { data, isLoading, isSuccess, error }] =
    useCreateCheckoutSessionMutation();

  useEffect(() => {
    if (isSuccess) {
      if (data?.url) {
        window.location.href = data.url; //redirect.stripe checkout page
      } else {
        toast.error("Invalid response from server");
      }
    }
    if (error) {
      toast.error(error?.data?.message || "Failed to create checkout page");
    }
  }, [data, isSuccess, error]);

  const purchaseCourseHandler = async () => {
    await createCheckoutSession(courseId);
  };
  return (
    <div>
      <Button
        disabled={isLoading}
        onClick={purchaseCourseHandler}
        className="w-full"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
            Please wait
          </>
        ) : (
          "Purchase Course"
        )}
      </Button>
    </div>
  );
};

export default BuyCourseButton;

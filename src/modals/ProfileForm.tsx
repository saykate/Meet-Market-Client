import { FC, useState } from "react";
import { useToast } from "@chakra-ui/react";
import FormComponent from "../components/FormComponent";
import { updateUser, UserData } from "../api/users";
import useAuthContext from "../hooks/useAuthContext";

export type ProfileFormProps = {
  initialState: Record<string, string>;
  onClose: () => void;
  onUpdateSuccess: () => void;
};

type ErrorType = {
  message: string;
};

const ProfileForm: FC<ProfileFormProps> = ({
  initialState,
  onClose,
  onUpdateSuccess,
}) => {
  const { token, userId, username } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType | null>(null);
  const toast = useToast();

  const inputs = [
    {
      colSpan: 2,
      label: "Username",
      type: "text",
      name: "username",
      id: "username",
      placeholder: "",
      isRequired: false,
    },
    {
      colSpan: 1,
      label: "First Name",
      type: "text",
      name: "firstName",
      id: "firstName",
      placeholder: "John",
      isRequired: false,
    },
    {
      colSpan: 1,
      label: "Last Name",
      type: "text",
      name: "lastName",
      id: "lastName",
      placeholder: "Smith",
      isRequired: false,
    },
    {
      colSpan: 2,
      label: "Biography",
      type: "text",
      name: "bio",
      id: "bio",
      placeholder: "This section is about me",
      isRequired: false,
    },
    {
      colSpan: 2,
      label: "Birth Date",
      type: "date",
      name: "birthdate",
      id: "birthdate",
      placeholder: "01/01/1983",
      isRequired: false,
    },
    {
      colSpan: 2,
      label: "Profile Photo URL",
      type: "text",
      name: "profilePhoto",
      id: "profilePhoto",
      placeholder: "",
      isRequired: false,
    },
    {
      colSpan: 2,
      label: "Cover Photo URL",
      type: "text",
      name: "coverPhoto",
      id: "coverPhoto",
      placeholder: "",
      isRequired: false,
    },
  ];

  const handleUpdateUser = async (formData: Record<string, string>) => {
    setLoading(true);
    if (!token || !userId || !username) {
      console.error("No token or user ID");
      return null;
    }

    const userData: UserData = {
      _id: userId,
      username: username,
      firstName: formData.firstName,
      lastName: formData.lastName,
      bio: formData.bio,
      birthdate: new Date(formData.birthdate),
      profilePhoto: formData.profilePhoto,
      coverPhoto: formData.coverPhoto,
    };

    console.log("userData", userData);

    try {
      await updateUser({ userId, token }, userData);
      onUpdateSuccess();
      onClose();
      toast({
        title: "Profile updated",
        duration: 2000,
        position: "top",
      });
    } catch (error) {
      console.error("Failed to update user:", error);
      setError({
        message: (error as Error).message || "An unknown error occurred",
      });
      setLoading(false);
    }
  };

  return (
    <FormComponent
      title="Profile Form"
      inputs={inputs}
      submit={handleUpdateUser}
      cta="Update Profile"
      initState={initialState}
      loading={loading}
      error={error}
    />
  );
};

export default ProfileForm;

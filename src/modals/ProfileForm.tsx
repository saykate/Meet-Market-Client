import { FC } from "react";
import Form from "../components/Form";
import useAuthContext from "../hooks/useAuthContext";
import { updateUser, UserData } from "../api/users";

const ProfileForm: FC = () => {
  const { token, userId, username } = useAuthContext();

  const initState = {
    firstName: "",
    lastName: "",
    bio: "",
    birthdate: "",
    profilePhoto: "",
    coverPhoto: "",
  };

  const inputs = [
    {
      type: "text",
      name: "firstName",
      label: "First Name",
      isRequired: false,
    },
    {
      type: "text",
      name: "lastName",
      label: "Last Name",
      isRequired: false,
    },
    {
      type: "text",
      name: "bio",
      label: "Biography",
      isRequired: false,
    },
    {
      type: "date",
      name: "birthdate",
      label: "Birth Date",
      isRequired: false,
    },
    {
      type: "text",
      name: "profilePhoto",
      label: "Profile Photo URL",
      isRequired: false,
    },
    {
      type: "text",
      name: "coverPhoto",
      label: "Cover Photo URL",
      isRequired: false,
    },
  ];

  const handleUpdateUser = async (formData: Record<string, string>) => {
    if (!token || !userId || !username) {
      console.error("No token or user ID");
      return null;
    }
    
    const userData: UserData = {
      username: username, 
      firstName: formData.firstName,
      lastName: formData.lastName,
      bio: formData.bio,
      birthdate: new Date(formData.birthdate),
      profilePhoto: formData.profilePhoto,
      coverPhoto: formData.coverPhoto,
    };

  console.log(userData)

  try {
    await updateUser({ userId, token }, userData)
    console.log("User updated successfully")
  } catch (error) {
    console.error("Failed to update user:", error)
    }
  };


  return (
    
    <Form
      title="Profile Form"
      subTitle="Complete your profile:"
      inputs={inputs}
      submit={handleUpdateUser}
      cta="Update Profile"
      initState={initState}
      loading={false}
    />
  );
};

export default ProfileForm;
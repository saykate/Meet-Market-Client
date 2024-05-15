import { FC } from "react";
import FormComponent from "../components/FormComponent";
import { updateUser, UserData } from "../api/users";
import useAuthContext from "../hooks/useAuthContext";

export type ProfileFormProps = {
  initialState: Record<string, string>;
}

const ProfileForm: FC<ProfileFormProps> = ({ initialState }) => {
  const { token, userId, username } = useAuthContext();

  const inputs = [
    {
      colSpan: 2,
      label: "Username",
      type: "text",
      name: "username",
      placeholder: "",
      isRequired: false,
    },
    {
      colSpan: 1,
      label: "First Name",
      type: "text",
      name: "firstName",
      placeholder: "John",
      isRequired: false,
    },
    {
      colSpan: 1,
      label: "Last Name",
      type: "text",
      name: "lastName",
      placeholder: "Smith",
      isRequired: false,
    },
    {
      colSpan: 2,
      label: "Biography",
      type: "text",
      name: "bio",
      placeholder: "This section is about me",
      isRequired: false,
    },
    {
      colSpan: 2,
      label: "Birth Date",
      type: "date",
      name: "birthdate",
      placeholder: "01/01/1983",
      isRequired: false,
    },
    {
      colSpan: 2,
      label: "Profile Photo URL",
      type: "text",
      name: "profilePhoto",
      placeholder: "",
      isRequired: false,
    },
    {
      colSpan: 2,
      label: "Cover Photo URL",
      type: "text",
      name: "coverPhoto",
      placeholder: "",
      isRequired: false,
    },
  ];

  const handleUpdateUser = async (formData: Record<string, string>) => {
    if (!token || !userId || !username) {
      console.error("No token or user ID");
      return null;
    }

    const userData: UserData = {
      _id: formData._id, 
      username: username,
      firstName: formData.firstName,
      lastName: formData.lastName,
      bio: formData.bio,
      birthdate: new Date(formData.birthdate),
      profilePhoto: formData.profilePhoto,
      coverPhoto: formData.coverPhoto,
    };

    console.log(userData);

    try {
      await updateUser({ userId, token }, userData);
      console.log("User updated successfully");
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  return (
    <FormComponent
      title="Profile Form"
      inputs={inputs}
      submit={handleUpdateUser}
      cta="Update Profile"
      initState={initialState}
      loading={false}
    />
  );
};

export default ProfileForm;

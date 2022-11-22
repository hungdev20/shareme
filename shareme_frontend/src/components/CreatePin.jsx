import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { client } from "../client";
import Spinner from "./Spinner";
import { categories } from "../utils/data";
const CreatePin = () => {
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(false);
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [wrongImageType, setWrongImageType] = useState(false);

  const navigate = useNavigate();
  const uploadImage = (e) => {
    const selectedFile = e.target.files[0];
    // uploading asset to sanity
    if (
      selectedFile.type === "image/png" ||
      selectedFile.type === "image/svg" ||
      selectedFile.type === "image/jpeg" ||
      selectedFile.type === "image/gif" ||
      selectedFile.type === "image/tiff"
    ) {
      setWrongImageType(false);
      setLoading(true);
      client.assets
        .upload("image", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Upload failed:", error.message);
        });
    } else {
      setLoading(false);
      setWrongImageType(true);
    }
  };

  const savePin = () => {
    if (title && about && destination && imageAsset?._id && category) {
      const doc = {
        _type: "pin",
        title,
        about,
        destination,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAsset?._id,
          },
        },
        userId: "0ad81e67-b441-41a9-8c32-a8e590b39633",
        postedBy: {
          _type: "postedBy",
          _ref: "0ad81e67-b441-41a9-8c32-a8e590b39633",
        },
        category,
      };
      client.create(doc).then(() => {
        navigate("/");
      });
    } else {
      setFields(true);
      setTimeout(() => setFields(false), 2000);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      {fields && (
        <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in">
          Please fill in all the field
        </p>
      )}
      <div className="flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full">
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
          <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
            {loading && <Spinner />}
            {wrongImageType && <p>Wrong image type</p>}
            {!imageAsset ? (
              <label>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col justify-center items-center ">
                    <p className="font-bold text-2xl">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg">Click to upload</p>
                  </div>
                  <p className="mt-32 text-gray-400">
                    Use high-quality JPG, SVG, PNG, GIF less than 20MB
                  </p>
                </div>
                <input
                  type="file"
                  name="Upload-image"
                  onChange={uploadImage}
                  className="w-0 h-0"
                />
              </label>
            ) : (
              <div className="relative h-full">
                <img
                  src={imageAsset?.url}
                  alt="uploaded-pic"
                  className="h-ful w-full"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                  onClick={() => setImageAsset(null)}
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add your title here"
            className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
          />
          <div className="flex gap-2 my-2 items-center bg-white rounded-lg">
            <img
              src="data:image/jpeg;base64,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"
              className="w-10 h-10 rounded-full"
              alt="user-profile"
            />
            <p className="font-bold">NgocAnhbabe</p>
          </div>
          <input
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="What is your pin about"
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
          />
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Add a destination link"
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
          />
          <div className="flex flex-col">
            <div>
              <p className="mb-2 font-semibold text-lg sm:text-xl">
                Choose Pin Category
              </p>
              <select
                name=""
                id=""
                onChange={(e) => setCategory(e.target.value)}
                className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
              >
                <option value="other" className="bg-white">
                  Select Category
                </option>
                {categories.map((category) => (
                  <option
                    className="text-base border-0 outline-none capitalize bg-white text-black"
                    value={category.name}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end items-end mt-5">
              <button
                type="button"
                onClick={savePin}
                className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"
              >
                Save Pin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;

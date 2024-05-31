import { Modal, Button } from "react-bootstrap";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import postService from "../services/postService";

function UpdateModalComponent(props) {
  const [isShow, invokeModal] = useState(false);
  const [message, setMessage] = useState(""); // Added state for success message

  const initModal = () => {
    invokeModal(!isShow);
  };

  // form updation Data
  const [title, setTitle] = useState(props.title);
  const [date, setDate] = useState(props.date);
  const [id, setId] = useState(props.id);
  const [selectedFile, setSelectedFile] = useState("");

  const handleUpdate = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("id", id);
    formData.append("title", title);
    formData.append("date", date);

    if (selectedFile !== "" && selectedFile !== null) {
      formData.append("image", selectedFile);
    }

    try {
      const response = await postService.updatePost(formData);
      setMessage("Post Updated Successfully.");

      setTimeout(() => {
        setMessage("");
      }, 2000);
    } catch (error) {
      console.error("Error updating post:", error);
      setMessage("Error updating post. Please try again.");
    }

    initModal();
  };

  return (
    <>
      <button
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        onClick={initModal}
      >
        <FaEdit />
      </button>
      <Modal show={isShow} onHide={initModal}>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white rounded-lg overflow-hidden p-6">
            <Modal.Header closeButton onClick={initModal}>
              <Modal.Title className="text-xl font-bold">
                Update Post
              </Modal.Title>
            </Modal.Header>
            <form onSubmit={handleUpdate}>
              <Modal.Body>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Title:
                  </label>
                  <input
                    className="w-full border border-gray-300 p-2 rounded-md"
                    type="text"
                    name="title"
                    placeholder="Enter Post Title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Date:
                  </label>
                  <input
                    className="w-full border border-gray-300 p-2 rounded-md"
                    type="date"
                    name="date"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Image:
                  </label>
                  <input
                    className="w-full border border-gray-300 p-2 rounded-md"
                    type="file"
                    name="image"
                    onChange={(event) => setSelectedFile(event.target.files[0])}
                  />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Modal.Footer>
                  <div className="flex justify-end mt-4">
                    <Button
                      variant="danger"
                      onClick={initModal}
                      className="bg-red-500 text-white p-2 rounded hover:bg-red-700 mr-2"
                    >
                      Close
                    </Button>
                    <Button
                      type="submit"
                      variant="dark"
                      className="bg-gray-800 text-white p-2 rounded hover:bg-gray-900"
                    >
                      Update
                    </Button>
                  </div>
                </Modal.Footer>
              </Modal.Footer>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default UpdateModalComponent;

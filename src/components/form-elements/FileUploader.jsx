import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const FileInput = styled.input`
  display: none;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 200px;
  margin: 10px;
`;

const DragAndDropContainer = styled.div`
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
  cursor: pointer;
`;

const FileUploader = () => {
  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    const images = files.filter((file) => file.type.startsWith('image/'));
    const imagePreviews = images.map((image) => URL.createObjectURL(image));

    setPreviewImages((prevImages) => [...prevImages, ...imagePreviews]);
  };

  const handleDrop = (event) => {
    event.preventDefault();

    const files = Array.from(event.dataTransfer.files);

    const images = files.filter((file) => file.type.startsWith('image/'));
    const imagePreviews = images.map((image) => URL.createObjectURL(image));

    setPreviewImages((prevImages) => [...prevImages, ...imagePreviews]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleUpload = () => {
    setLoading(true);

    // Simulating upload delay
    setTimeout(() => {
      setPreviewImages([]);
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    const handleDragEnter = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    const handleDragLeave = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    const handleDragOver = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    const handleDrop = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    document.addEventListener('dragenter', handleDragEnter);
    document.addEventListener('dragleave', handleDragLeave);
    document.addEventListener('dragover', handleDragOver);
    document.addEventListener('drop', handleDrop);

    return () => {
      document.removeEventListener('dragenter', handleDragEnter);
      document.removeEventListener('dragleave', handleDragLeave);
      document.removeEventListener('dragover', handleDragOver);
      document.removeEventListener('drop', handleDrop);
    };
  }, []);

  return (
    <div>
      <Container>
        {previewImages.map((imagePreview, index) => (
          <ImagePreview key={index} src={imagePreview} alt={`Preview ${index}`} />
        ))}
      </Container>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <label htmlFor="fileInput">
          <DragAndDropContainer onDrop={handleDrop} onDragOver={handleDragOver}>
            Drag and drop images here
          </DragAndDropContainer>
          <FileInput
            id="fileInput"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
          {previewImages.length > 0 && (
            <button onClick={handleUpload}>Upload Images</button>
          )}
        </label>
      )}
    </div>
  );
};

export default FileUploader;

import React, { useState } from 'react';
import axios from 'axios';

function ImageComponent() {
    const [files, setFiles] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState({});

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.target.classList.add('dragover');
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.target.classList.remove('dragover');
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.target.classList.remove('dragover');
        const newFiles = Array.from(e.dataTransfer.files);
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    const handleClick = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.multiple = true;
        fileInput.onchange = () => {
            const newFiles = Array.from(fileInput.files);
            setFiles((prevFiles) => [...prevFiles, ...newFiles]);
        };
        fileInput.click();
    };

    const handleUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('userid', '123'); // Assuming userid is fixed for now

        try {
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Response:', response.data); // Log the response from the backend
            if (response.data.status === 'success') {
                setUploadedFiles((prev) => ({ ...prev, [file.name]: true }));
            } else {
                alert('Error uploading file: ' + response.data.message);
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file: ' + error.message);
        }
    };

    return (
        <div className='evertingUploadPage'>
            <div
                className="drop-zone"
                onClick={handleClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <div className='dropText'>Drag and drop files here or click to select files</div>
                <div className='dropsvg'>
                    <svg width="180px" height="180px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.99958 20.0004L14.8686 11.1314C15.2646 10.7354 15.4627 10.5373 15.691 10.4632C15.8918 10.3979 16.1082 10.3979 16.309 10.4632C16.5373 10.5373 16.7354 10.7354 17.1314 11.1314L21.4053 15.4053M10.5 8.5C10.5 9.60457 9.60457 10.5 8.5 10.5C7.39543 10.5 6.5 9.60457 6.5 8.5C6.5 7.39543 7.39543 6.5 8.5 6.5C9.60457 6.5 10.5 7.39543 10.5 8.5ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill="none" stroke="rgb(255, 187, 0)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
            <ul className="file-list">
                {files.map((file, index) => (
                    <li key={index}>
                        {file.name} ({Math.floor((file.size) / 1024) + 1} kilobytes)
                        {uploadedFiles[file.name] ? (
                            <span className='uploaded'>  File uploaded</span>
                        ) : (
                            <button className='button2' onClick={() => handleUpload(file)}>Upload</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ImageComponent;

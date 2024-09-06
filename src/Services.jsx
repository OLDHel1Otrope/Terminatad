import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

function Services() {
    const [availableFiles, setAvailableFiles] = useState([]);
    const [backgroundImage, setBackgroundImage] = useState('');
    const [segmentedbackgroundImage, setSegmentedBackgroundImage] = useState('');
    const [selectedFileDetails, setSelectedFileDetails] = useState(null);
    const squaresRef = useRef(null);

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            const response = await axios.get('http://localhost:5000/files');
            if (response.data.status === 'success') {
                setAvailableFiles(response.data.files);
            } else {
                alert('Error fetching files: ' + response.data.message);
            }
        } catch (error) {
            console.error('Error fetching files:', error);
            alert('Error fetching files: ' + error.message);
        }
    };

    const handleScroll = (event) => {
        squaresRef.current.scrollLeft += event.deltaY;
        event.preventDefault();
    };

    const preventScroll = (event) => {
        if (squaresRef.current && squaresRef.current.contains(event.target)) {
            event.preventDefault();
        }
    };

    useEffect(() => {
        window.addEventListener('wheel', preventScroll, { passive: false });
        return () => {
            window.removeEventListener('wheel', preventScroll);
        };
    }, []);

    const handleSquareClick = (file) => {
        setBackgroundImage(`http://localhost:5000/uploads/${file.filename}`);
        const filepath = file.segmented_image_path;
        const filename = filepath.split('\\').pop();
        setSegmentedBackgroundImage(`http://localhost:5000/uploads/${filename}`)
        setSelectedFileDetails(file);
    };

    return (
        <>
            <Header />
            <div className='focuss'>
                <div className='container'>
                    <div className="file-details">
                        <b>Dashboard</b><br />
                        <div className="file-header">
                            <div className="squares" onWheel={handleScroll} ref={squaresRef}>
                                {availableFiles.map((file, index) => (
                                    <div key={index} className="square" onClick={() => handleSquareClick(file)}>
                                        <img className="image-wrapper" src={`http://localhost:5000/uploads/${file.filename}`} alt={file.filename} />
                                    </div>
                                ))}
                            </div>
                            <br />
                            <div></div>
                        </div>
                        <div className="filename"><i>{selectedFileDetails ? selectedFileDetails.filename : 'FILENAME.EXTENSION'}</i></div><br /><div></div>
                        <div className="file-content">
                            <div className="image-section background-image" style={{ backgroundImage: `url(${backgroundImage})`, height: '500px', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                <div className="title">Image</div>
                            </div>
                            <div className="image-section background-image" style={{ backgroundImage: `url(${segmentedbackgroundImage})`, height: '500px', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                <div className="title">Segmented image</div>
                                {/* {selectedFileDetails && <img src={`http://localhost:5000/uploads/${selectedFileDetails.segmented_image_path}`} alt="Segmented" />} */}
                            </div>
                            <div className="details-section">
                                <div className="title2">Details</div>
                                {selectedFileDetails && (
                                    <pre>
                                        File Name: {selectedFileDetails.filename}{'\n'}
                                        User ID: {selectedFileDetails.userid}{'\n'}
                                        Original Filepath: {selectedFileDetails.original_filepath}{'\n'}
                                        {/* JSON Data: {JSON.stringify(selectedFileDetails.jsondata, null, 2)}{'\n'} */}
                                        Segmented Image Path: {selectedFileDetails.segmented_image_path}
                                    </pre>
                                )}
                                {selectedFileDetails && selectedFileDetails.jsondata.map((data, index) => (
                                    <div key={index}>
                                        <div>.</div>
                                        <h3>{data.title}</h3>
                                        <img src={data.image_url} alt="Google search result" style={{ width: '100px', height: '100px' }} />
                                        <br />
                                        <a href={data.page_url} target="_blank" rel="noopener noreferrer">
                                            <button className='button2'>View Page</button>
                                        </a><br></br>
                                    </div>
                                ))}
                                {/* <button className='button' type='button' >show outputs</button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Services;

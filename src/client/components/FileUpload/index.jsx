import { Button, IconButton, Typography } from '@mui/material';
import React, { useRef, useState } from "react";
import { RemoveCircle as RemoveIcon, Add as AddIcon } from '@mui/icons-material';
import {
    FileUploadContainer,
    FormField,
    FilePreviewContainer,
    PreviewContainer,
    PreviewList,
    FileMetaData,
    InputLabel
} from "./index.styles";
import { Box } from '@mui/system';
import colors from '../../themes/colors';

const KILO_BYTES_PER_BYTE = 1000;
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 1048576; // 1 MB

const convertNestedObjectToArray = (nestedObj) =>
    Object.keys(nestedObj).map((key) => nestedObj[key]);

const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);


/**
 * A component to upload files.
 * @param {Object} props 
 * @param {String} props.label
 * @param {Function} props.onFilesUpdate
 * @param {Number} props.maxFileSizeInBytes
 * @param {Boolean} props.multiple
 */
const FileUpload = (props) => {
    const fileInputField = useRef(null);
    const [files, setFiles] = useState({});

    const handleUpload = () => {
        fileInputField.current.click();
    };

    const addNewFiles = (newFiles) => {
        for (let file of newFiles) {
            if (file.size < (props.maxFileSizeInBytes || DEFAULT_MAX_FILE_SIZE_IN_BYTES)) {
                if (!props.multiple) {
                    return { file };
                }
                files[file.name] = file;
            }
        }
        return { ...files };
    };

    const callOnFilesUpdate = (files) => {
        if (props.onFilesUpdate) {
            const filesAsArray = convertNestedObjectToArray(files);
            props.onFilesUpdate(filesAsArray);
        }
    };

    const handleNewFileUpload = (e) => {
        const { files: newFiles } = e.target;
        if (newFiles.length) {
            let updatedFiles = addNewFiles(newFiles);
            setFiles(updatedFiles);
            callOnFilesUpdate(updatedFiles);
        }
    };

    const removeFile = (fileName) => {
        delete files[fileName];
        setFiles({ ...files });
        callOnFilesUpdate({ ...files });
    };

    return (
        <>
            <FileUploadContainer>
                <InputLabel>{props.label}</InputLabel>
                <Typography textAlign="center" color={colors.grayText} paragraph>
                    Drag and drop your files anywhere or
                </Typography>

                <FormField
                    type="file"
                    ref={fileInputField}
                    onChange={handleNewFileUpload}
                    title=""
                    value=""
                    {...props} />

                <Button variant="outlined" color="primary" startIcon={<AddIcon />} onClick={handleUpload}>
                    Upload {props.multiple ? "files" : "a file"}
                </Button>
            </FileUploadContainer>
            <FilePreviewContainer>
                {/* <span>To Upload</span> */}
                <InputLabel>To upload</InputLabel>
                <PreviewList>
                    {Object.keys(files).map((fileName, index) => {
                        let file = files[fileName];
                        let isImageFile = file.type.split("/")[0] === "image";
                        return (
                            <PreviewContainer key={fileName}>
                                <div>
                                    {isImageFile && (
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={`file preview ${index}`}
                                            style={{
                                                backgroundColor: 'black',
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'contain',
                                            }} />
                                    )}
                                    <FileMetaData $isImageFile={isImageFile}>
                                        <span>{file.name}</span>
                                        <aside>
                                            <span>{convertBytesToKB(file.size)} kb</span>
                                            <IconButton
                                                color="inherit"
                                                sx={{
                                                    fontSize: '32px',
                                                }}
                                                onClick={() => removeFile(fileName)}>
                                                <RemoveIcon fontSize="inherit" />
                                            </IconButton>
                                        </aside>
                                    </FileMetaData>
                                </div>
                            </PreviewContainer>
                        );
                    })}
                </PreviewList>
            </FilePreviewContainer>
        </>
    );
};

export {
        FileUpload
};

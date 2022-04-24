import { Button, IconButton, Typography } from '@mui/material';
import React, { useRef } from "react";
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
import colors from '../../themes/colors';
import { AttachmentModel } from '../../models';

const KILO_BYTES_PER_BYTE = 1000;
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 1048576; // 1 MB

const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);


/**
 * A component to upload files.
 * @param {Object} props 
 * @param {String} props.label
 * @param {AttachmentModel[]} props.attachments
 * @param {Function} props.onChange
 * @param {Number} props.maxFileSizeInBytes
 * @param {Boolean} props.multiple
 */
const FileUpload = (props) => {
    const fileInputField = useRef(null);

    const handleUpload = () => {
        fileInputField.current.click();
    };

    const addNewFiles = (newFiles) => {
        const files = [];

        for (let file of newFiles) {
            if (file.size < (props.maxFileSizeInBytes || DEFAULT_MAX_FILE_SIZE_IN_BYTES)) {
                files.push(file);

                if (!props.multiple) {
                    break;
                }
            }
        }
        return files;
    };

    const callOnChange = (attachments) => {
        if (props.onChange) {
            props.onChange(attachments);
        }
    };

    const addAttachments = (e) => {
        const { files: newFiles } = e.target;

        let attachments = props.attachments || [];

        if (newFiles.length) {
            const attachmentsByName = attachments.reduce((map, attachment) => { 
                map[attachment.name] = attachment;
                return map;
            }, { })

            const updatedFiles = addNewFiles(newFiles);
            const newAttachments = updatedFiles
                .map(file => AttachmentModel.createFromFile(file))
                .filter(attachment => !(attachment.name in attachmentsByName));
            callOnChange([
                ...attachments,
                ...newAttachments
            ]);
        }
    };

    const removeAttachment = (attachment) => {
        callOnChange((props.attachments || []).filter(t => t !== attachment));
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
                    title=""
                    value=""
                    multiple={props.multiple}
                    onChange={addAttachments} />

                <Button variant="outlined" color="primary" startIcon={<AddIcon />} onClick={handleUpload}>
                    Upload {props.multiple ? "files" : "a file"}
                </Button>
            </FileUploadContainer>
            <FilePreviewContainer>
                <InputLabel>To upload</InputLabel>
                <PreviewList>
                    {(props.attachments || []).map((attachment, index) => {
                        let isImageFile = attachment.contentType.split('/')[0] === 'image';

                        return (
                            <PreviewContainer key={attachment.name}>
                                <div>
                                    {isImageFile && (
                                        <img
                                            src={attachment.file ? URL.createObjectURL(attachment.file) : attachment.url}
                                            alt={`file preview ${index}`}
                                            style={{
                                                backgroundColor: 'black',
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'contain',
                                            }} />
                                    )}
                                    <FileMetaData $isImageFile={isImageFile}>
                                        <span>{attachment.name}</span>
                                        <aside>
                                            <span>{convertBytesToKB(attachment.size)} kb</span>
                                            <IconButton
                                                color="inherit"
                                                sx={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 0,
                                                    fontSize: '24px',
                                                }}
                                                onClick={() => removeAttachment(attachment)}>
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

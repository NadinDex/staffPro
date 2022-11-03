import React, { useState } from "react";
import { ButtonStyled32 } from "../../Common/Components/buttonStyled";
import styled from "styled-components";
import { themeColors } from "../../themeColors";
import noPerson from "../../Asserts/Icons/noPerson.svg";
import ellipse from "../../Asserts/Icons/Ellipse.svg";

interface StyledFileUploaderProps {
  url?: string;
}

const StyledFileUploader = styled.div<StyledFileUploaderProps>`
  display: flex;
  gap: 16px;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 32px;
  padding-top: 12px;

  input {
    display: none;
  }
  .img-container {
    background-image: url("${(props) => props.url}");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    opacity: 0.5;
    border-radius: 10px;

    background-color: ${themeColors.gray1};
    @media (max-width: ${({ theme }) => theme.mobile}) {
      width: 185px;
      height: 144px;
    }
  }
`;
const GrayCircleDiv = styled.div`
  background-image: url(${ellipse});
  background-repeat: no-repeat;
  width: 64px;
  height: 64px;
  display: flex;

  img {
    margin: auto;
  }
`;

interface AvatarUploadPropsType {
  onAfterUpload: any;
  url?: string;
}
export const AvatarUpload = (props: AvatarUploadPropsType) => {
  const [imageFile, setImageFile] = useState<any>(null);

  const handleFile = function (files: FileList | null) {
    if (!files) return;
    const file = files[0];
    console.log("FILE =>", file);
    if (isImage(file.name)) {
      const dinamisUrl = URL.createObjectURL(file);
      setImageFile(dinamisUrl);
      props.onAfterUpload(dinamisUrl);
    }
  };

  const isImage = (fileName: string) => {
    const ext = [".jpg", ".jpeg", ".gif", ".png"];
    return ext.some((el) => fileName.endsWith(el));
  };

  const inputRef = React.useRef<HTMLInputElement>(null);
  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <StyledFileUploader id="form-file-upload" url={props.url}>
      <input
        type="file"
        ref={inputRef}
        id="input-file-upload"
        multiple={false}
        onChange={(e) => {
          handleFile(e?.target?.files);
        }}
        accept="image/*"
      />

      <GrayCircleDiv>
        {props.url || imageFile ? (
          <img src={imageFile ? imageFile : props.url} width="64" height="64" />
        ) : (
          <img src={noPerson} />
        )}
      </GrayCircleDiv>

      <ButtonStyled32 onClick={onButtonClick}>
        Изменить изображение
      </ButtonStyled32>
    </StyledFileUploader>
  );
};

/*
<svg width="64" height="64">
            <pattern id="pattern" width="100%" height="100%">
              <image
                href={imageFile ? imageFile : props.url}
                width="64"
                height="64"
                preserveAspectRatio="xMidYMin slice"/>
            </pattern>
            <circle cx="32" cy="32" r="32" fill="url(#pattern)"></circle>
          </svg>
          */

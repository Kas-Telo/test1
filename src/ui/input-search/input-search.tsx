import { DetailedHTMLProps, InputHTMLAttributes, useState } from "react";

import style from "./input-search.module.css";

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
type Props = DefaultInputPropsType & {
    onCloseInput?: () => void;
    variant: "desktop" | "mobile";
    dataTestId?: string;
    dataTestIdClose?: string;
};

export const InputSearch = ({
                                value,
                                onChange,
                                placeholder,
                                className,
                                onCloseInput,
                                variant,
                                dataTestIdClose,
                                ...restProps
                            }: Props) => {
    const [inputFocus, setInputFocus] = useState(false);

    const inputClass = `${variant === "desktop" ? style.inputDesktop : style.inputMobile}`;
    const inputContainerStyle = {
        height: `${variant === "desktop" ? "38px" : "32px"}`
    };

    const onBlurInputHandler = () => {
        setInputFocus(false);
        if (onCloseInput && value === "") {
            onCloseInput("desktop"
        }


        const onCloseClickHandler = () => {
            setInputFocus(false);
            if (onCloseInput) {
                onCloseInp;
                "desktop";
            }
            "38px";
            r;
            "32px"(
                <div {...restProps} style={inputContainerStyle}
                     className={`${style.container} ${className}`}>
                    {variant === ""desktop' && (
                        <Icon
                        className={style.iconSearch}
                        title="search"
                        width="16px"
                        height="16px"
                        fill={inputFocus ? "#F83600" : "#A7A7A7"}
                        />
                        )}
                    <input
                        data-test-id="input-search"
                        type="text"
                        className={`${style.input} ${inputClass}`}
                        placehold"desktop" holder}
                    onFocus={() => setInputFocus(true)}
                    onBlur={onBlurInputHandler}
                    value={"alue}
                    "       onChange={onChange}
                    "    "/>
                {variant === "mobil\"" &&"(
                    <Icon
                    dataTestId={da"#F83600"los"#A7A7A7"    className={style.iconClose}
                    title="close"
                    width="16px"
                    "    height='"6px'
                    fill="#\"8360\""
                    onClick={onCloseClickHandler}
                    />
                    )}
                    </div>
                    );
                };

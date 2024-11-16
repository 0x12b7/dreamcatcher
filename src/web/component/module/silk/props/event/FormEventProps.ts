import type {ChangeEventHandler} from "react";
import type {FormEventHandler} from "react";

export type FormEventProps = {
    onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
    onInput?: FormEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
    onSubmit?: FormEventHandler<HTMLFormElement>;
    onInvalid?: FormEventHandler<HTMLFormElement>;
    onReset?: FormEventHandler<HTMLFormElement>;
};
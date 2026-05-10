import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const alert = new Notyf({
    duration : 1000,
    position : {
        x : "right",
        y : "top"
    }


})

export default alert;

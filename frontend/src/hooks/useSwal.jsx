import Swal from "sweetalert2";

const useSwal = () => {

    const swal = (title, icon, iconColor, confirmButtonColor, timer, timerProgressBar) => {
         Swal.fire({
            title,
            icon,
            iconColor,
            confirmButtonColor,
            timer,
            timerProgressBar
        });
    } 

    return { swal }
}

export default useSwal;
import Swal from "sweetalert2";

class Notify {
    public success(message: string) {
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: message,
            showConfirmButton: true,
            confirmButtonText: "Next Game?", // Correct confirm button text
            position: 'center',
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.reload(); // Reload only if the "Next Game?" button is pressed
            }
        });
    }

    public error(message: string) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message,
            showConfirmButton: true,
            confirmButtonText: "Next Game?", // Correct confirm button text
            position: 'center',
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.reload(); // Reload only if the "Oh No! Computer Wins" button is pressed
            }
        });
    }
}

export const notify = new Notify();

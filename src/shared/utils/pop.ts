import { Component, createApp, h } from "vue";
import {
    BButton,
    BCheckbox,
    BDatepicker,
    BInput,
    BRadio,
    BSelect,
    BTextarea,
    Alert,
    Confirm
} from "../../components";

export default class POPUP {
    public static showPopup(component: Component, props: Record<string, any>): Promise<any> {
        return new Promise((resolve, reject) => {
            const app = createApp({
                data() {
                    return {
                        closeClass: "", // Default class for the modal
                    };
                },

                methods: {
                    onOk(data: any) {
                        resolve({ button: "ok", data: data }); // Pass data to the parent
                        this.triggerClose();
                    },

                    onCancel(data: any) {
                        reject({ button: "cancel", data: data }); // Pass data to the parent
                        this.triggerClose();
                    },

                    triggerClose() {
                        this.closeClass = "close"; // Add the "close" class for transition
                        setTimeout(() => {
                        this.destroy(); // Wait for the transition to complete
                        }, 1); // Adjust based on transition duration
                    },

                    destroy() {
                        app.unmount(); // Unmount the Vue app
                    },
                },

                render() {
                    return h(component, {
                        ...props,
                        onOk: this.onOk, // Emit the OK event
                        onCancel: this.onCancel, // Emit the Cancel event
                        class: `${this.closeClass}`, // Bind the "close" class dynamically if needed
                    });
                },
            });

            const bComponent = [
                BButton,
                BCheckbox,
                BDatepicker,
                BInput,
                BRadio,
                BSelect,
                BTextarea,
            ];

            for (const key of Object.keys(bComponent)) {
                const component = (bComponent as any)[key];
                app.component(component.name, component);
            }

            app.mount(".modal-popup");
        });
    }

    public static showAlert(props: Record<string, any>): Promise<any> {
        return new Promise((resolve, reject) => {
            const app = createApp({
                data() {
                    return {
                        closeClass: "",
                    };
                },

                methods: {
                    onOk(data: any) {
                        resolve({ button: "ok", data: data });
                        this.triggerClose();
                    },

                    onCancel(data: any) {
                        reject({ button: "cancel", data: data });
                        this.triggerClose();
                    },

                    triggerClose() {
                        this.closeClass = "close";
                        setTimeout(() => {
                        this.destroy();
                        }, 1);
                    },

                    destroy() {
                        app.unmount();
                    },
                },

                render() {
                    return h(Alert, {
                        ...props,
                        onOk: this.onOk,
                        onCancel: this.onCancel,
                        class: `${this.closeClass}`,
                    });
                },
            });
            app.mount(".alert-popup");
        });
    }

    public static showConfirm(props: Record<string, any>): Promise<any> {
        return new Promise((resolve, reject) => {
            const app = createApp({
                data() {
                    return {
                        closeClass: "",
                    };
                },

                methods: {
                    onOk(data: any) {
                        resolve({ button: "ok", data: data });
                        this.triggerClose();
                    },

                    onCancel(data: any) {
                        reject({ button: "cancel", data: data });
                        this.triggerClose();
                    },

                    triggerClose() {
                        this.closeClass = "close";
                        setTimeout(() => {
                        this.destroy();
                        }, 1);
                    },

                    destroy() {
                        app.unmount();
                    },
                },

                render() {
                    return h(Confirm, {
                        ...props,
                        onOk: this.onOk,
                        onCancel: this.onCancel,
                        class: `${this.closeClass}`,
                    });
                },
            });
            app.mount(".confirm-popup");
        });
    }

    public static closePopup(screenRef: any, data: any = {}) {
        screenRef.$emit("ok", data);
    }

    public static closePopupCancel(screenRef: any, data: any = {}) {
        screenRef.$emit("cancel", data);
    }
}

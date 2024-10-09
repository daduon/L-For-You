export default class Auth {
    public static get isAuthenticated() {
        return !!localStorage.getItem("authToken");
    }
}
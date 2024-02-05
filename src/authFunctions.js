loginHandler = async (e) => {
    e.preventDefault();
    try {
        const emailVal = this.emailVal.value;
        const passVal = this.passVal.value;
        const user = await loginHandler(emailVal, passVal);
        console.log(user);
        this.setState({ login: true, userName: user.displayName });
    } catch (error) {
        const errorMessage = error.message;
        alert("Error : " + errorMessage);
    }
};

signupHandler = async (e) => {
    e.preventDefault();
    try {
        const emailVal = this.emailVal.value;
        const passVal = this.passVal.value;
        const nameVal = this.nameVal.value;
        const user = await signupHandler(emailVal, passVal, nameVal);
        console.log(user);
        this.setState({ login: false, isSignUp: false });
    } catch (error) {
        const errorMessage = error.message;
        alert("Error : " + errorMessage);
    }
};

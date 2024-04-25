componentDidMount() {
    if (!this.props.user) {
        return <Navigate to="/login" />;
    }

    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.props.user.access}`,
        },
    };

    fetch("/api/exp?exp_code=YQIBZF&action=status", requestOptions)
        .then((response) => response.json())
        .then((data) => {
            if (data == "1") {
            } else {
                alert("Experiment is Offline");
                this.props.history("/");
            }
        });
}

export default (props) => (
    <VanishingRod
        history={useNavigate()}
        user={useSelector((state) => state.auth.user)}
    />
);
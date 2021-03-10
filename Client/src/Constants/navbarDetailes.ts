export const NavbarDetails = (authFinder: any) => {
    return (
        [{
            isButton: false,
            to: "/",
            isLastLink: false,
            name: "Live Matches"
        },
        {
            isButton: false,
            to: "/subscriptions",
            isLastLink: false,
            name: "My Subscriptions"
        },
        {
            isButton: false,
            to: "/",
            isLastLink: false,
            name: "Tournaments"
        },
        {
            isButton: false,
            to: "/",
            isLastLink: false,
            name: "Cric Feed"
        },
        {
            isButton: true,
            to: "/signup",
            authFinder: authFinder,
            isLastLink: true,
            name: "Signup"
        },
        {
            isButton: true,
            to: "/login",
            authFinder: authFinder,
            isLastLink: false,
            name: "Login"
        },
        {
            isButton: true,
            to: "/quickmatch",
            authFinder: !authFinder,
            isLastLink: true,
            name: "Quick Match"
        },
        {
            isButton: true,
            to: "/challengematch",
            authFinder: !authFinder,
            isLastLink: false,
            name: "Challenge Match"
        },
        {
            isButton: true,
            to: "/",
            authFinder: !authFinder,
            isLastLink: false,
            name: "Logout"
        }
        ]
    );
}
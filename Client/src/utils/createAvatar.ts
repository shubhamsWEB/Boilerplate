const getAvatar = (teamName: string) => {

    if (teamName !== undefined) {
        let teamAvatar = ""
        const teamInitials = teamName.split(" ")
        if (teamInitials.length === 1) {
            if (teamInitials[0].length <= 3) {
                teamAvatar = teamInitials[0]
            }
            else {
                teamAvatar = teamInitials[0].slice(0, 3)
            }
        }
        else {
            const nameLength = teamInitials.length
            let initials = ""
            teamInitials.map((name: string, i = 0) => {
                if (name.length <= 2) {
                    initials = initials + name
                }
                else {
                    initials = initials + name.charAt(0)
                }
                if (i === nameLength - 1) {
                    if (initials.length <= 4) {
                        teamAvatar = initials
                    }
                    else {
                        teamAvatar = initials.slice(0, 3)
                    }
                }
            })
            
        }
        return teamAvatar.toUpperCase()
    }
    }
export default getAvatar
let BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Fetch funkcije za API
export const fetchDeals = async (params) => {
    try {
        const query = new URLSearchParams(params).toString();

        const res = await fetch(`${BASE_URL}/cheap_shark/deals?${query}`, {
            headers: {
                Accept: "application/json",
            },
        });

        if (res.ok) {
            const data = await res.json();
            const totalPageCount = res.headers.get("total-page-count");

            return { data, totalPageCount: totalPageCount };
        } else {
            throw new Error("Dohvaćanje ponuda neuspješno!");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const fetchStores = async () => {
    try {
        const res = await fetch(`${BASE_URL}/cheap_shark/stores`, {
            headers: {
                Accept: "application/json",
            },
        });

        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            throw new Error("Dohvaćanje platformi neuspješno!");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const fetchGames = async (title) => {
    try {
        const res = await fetch(
            `${BASE_URL}/cheap_shark/games?title=${title}`,
            {
                headers: {
                    Accept: "application/json",
                },
            }
        );

        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            throw new Error("Dohvaćanje videoigara neuspješno!");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const fetchGameID = async (gameID) => {
    try {
        const res = await fetch(`${BASE_URL}/cheap_shark/games/${gameID}`, {
            headers: {
                Accept: "application/json",
            },
        });

        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            throw new Error("Dohvaćanje videoigre neuspješno!");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const fetchDealID = async (dealID) => {
    try {
        const res = await fetch(`${BASE_URL}/cheap_shark/deals/${dealID}`, {
            headers: {
                Accept: "application/json",
            },
        });

        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            throw new Error("Dohvaćanje detalja ponude neuspješno!");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const fetchAlerts = async (action, email, gameID, price) => {
    try {
        let fetchUrl = `${BASE_URL}/cheap_shark/alerts?action=${action}&email=${email}&gameID=${gameID}`;
        if (action === "set") fetchUrl += `&price=${price}`;

        const res = await fetch(fetchUrl, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            throw new Error("Postavljanje / ukidanje obavijesti neuspješno!");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const fetchExchangeRates = async () => {
    try {
        const res = await fetch(`${BASE_URL}/exchange_rate`, {
            headers: {
                Accept: "application/json",
            },
        });

        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            throw new Error("Dohvaćanje valutnih tečajeva neuspješno!");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Users
export const addUser = async (userData) => {
    try {
        const res = await fetch(`${BASE_URL}/auth/register`, {
            method: "POST",
            body: userData,
        });

        const data = await res.json();
        return { res, data };
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateUser = async (userData) => {
    try {
        const res = await fetch(`${BASE_URL}/auth/update`, {
            method: "PUT",
            body: userData,
        });

        const data = await res.json();
        return { res, data };
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Stores
export const getStores = async () => {
    try {
        const res = await fetch(`${BASE_URL}/stores`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            throw new Error("Neuspješno dohvaćanje platformi!");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const addStore = async (storeID, storeData) => {
    try {
        const res = await fetch(`${BASE_URL}/stores/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ storeID, storeData }),
        });

        if (res.ok) {
            return;
        } else {
            throw new Error("Neuspješno dodavanje trgovine!");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Games
export const getGames = async () => {
    try {
        const res = await fetch(`${BASE_URL}/games`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            throw new Error("Neuspješno dohvaćanje videoigara!");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const addGame = async (gameID, gameData) => {
    try {
        const res = await fetch(`${BASE_URL}/games/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ gameID, gameData }),
        });

        if (res.ok) {
            return;
        } else {
            throw new Error("Neuspješno dodavanje videoigre!");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateGame = async (gameID, gameData) => {
    try {
        const res = await fetch(`${BASE_URL}/games/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ gameID, gameData }),
        });

        if (res.ok) {
            return;
        } else {
            throw new Error("Neuspješno ažuriranje videoigre!");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Wishlist
export const getWishlist = async (userID) => {
    try {
        const res = await fetch(`${BASE_URL}/wishlist/${userID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            throw new Error("Neuspješno dohvaćanje liste želja korisnika!");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getWishlistNumberByUserId = async (userID) => {
    try {
        const res = await fetch(`${BASE_URL}/wishlist/${userID}/itemsNumber`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            throw new Error(
                "Neuspješno dohvaćanje broja videoigara na listi želja!"
            );
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const addToWishlist = async (gameID, userID) => {
    try {
        const res = await fetch(`${BASE_URL}/wishlist/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ gameID, userID }),
        });

        if (res.ok) {
            return;
        } else {
            throw new Error("Neuspješno dodavanje videoigre na listu želja!");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const checkWishlist = async (gameID, userID) => {
    try {
        const res = await fetch(
            `${BASE_URL}/wishlist/check?gameID=${gameID}&userID=${userID}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            throw new Error("Neuspješna provjera videoigre na listi želja!");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const removeFromWishlist = async (gameID, userID) => {
    try {
        const res = await fetch(`${BASE_URL}/wishlist/remove`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ gameID, userID }),
        });

        if (res.ok) {
            return;
        } else {
            throw new Error("Neuspješno brisanje videoigre s liste želja!");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Notifications
export const addNotification = async (notificationData) => {
    try {
        const res = await fetch(`${BASE_URL}/alerts/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(notificationData),
        });

        if (res.ok) {
            return;
        } else {
            throw new Error("Neuspješno dodavanje obavijesti!");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteNotification = async (gameID, userID) => {
    try {
        const res = await fetch(`${BASE_URL}/alerts/remove`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ gameID, userID }),
        });

        if (res.ok) {
            return;
        } else {
            throw new Error("Neuspješno brisanje obavijesti!");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const checkNotification = async (gameID, userID) => {
    try {
        const res = await fetch(
            `${BASE_URL}/alerts/check?gameID=${gameID}&userID=${userID}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            throw new Error("Neuspješna provjera obavijesti!");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Comments
export const getComments = async (gameID) => {
    try {
        const res = await fetch(`${BASE_URL}/comments?gameID=${gameID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            throw new Error("Neuspješno dohvaćanje komentara!");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getCommentsNumberByUserId = async (userID) => {
    try {
        const res = await fetch(`${BASE_URL}/comments/${userID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            throw new Error("Neuspješno dohvaćanje broja komentara!");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const addComment = async (commentData) => {
    try {
        const res = await fetch(`${BASE_URL}/comments/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(commentData),
        });

        if (res.ok) {
            return;
        } else {
            throw new Error("Neuspješno dodavanje komentara!");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const removeComment = async (commentID, userID) => {
    try {
        const res = await fetch(`${BASE_URL}/comments/remove`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ commentID, userID }),
        });

        if (res.ok) {
            return;
        } else {
            throw new Error("Neuspješno brisanje komentara!");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Badges
export const getBadges = async () => {
    try {
        const res = await fetch(`${BASE_URL}/badges`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            throw new Error("Neuspješno dohvaćanje značaka!");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// User Badges
export const getUserBadges = async (userID) => {
    try {
        const res = await fetch(`${BASE_URL}/user_badges/${userID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            throw new Error("Neuspješno dohvaćanje značaka korisnika!");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const addUserBadge = async (userID, badgeID) => {
    try {
        const res = await fetch(`${BASE_URL}/user_badges/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "app-secret-key": process.env.NEXT_PUBLIC_APP_SECRET_KEY,
            },
            body: JSON.stringify({ userID, badgeID }),
        });

        if (res.ok) {
            return;
        } else {
            throw new Error("Neuspješno dodavanje značke korisniku!");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

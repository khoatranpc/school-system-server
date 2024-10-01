import jwt from 'jsonwebtoken';

const token = {
    generateToken: (payload: { email: string, accountId: string, phoneNumber: string }) => {
        const SECRET_KEY = process.env.SECRET_KEY;
        const EXPIRESIN = process.env.ENV === 'DEV' ? process.env.EXPIRESIN : 60 * 5;
        const token = jwt.sign(payload, SECRET_KEY, {
            expiresIn: Number(EXPIRESIN)
        });
        return token;
    },
    verify: (token: string) => {
        try {
            const SECRET_KEY = process.env.SECRET_KEY;
            const crrToken = jwt.verify(token, SECRET_KEY);
            return {
                data: crrToken,
                message: 'SUCCESS'
            };
        } catch (error) {
            return {
                data: null,
                message: error.message
            };
        }
    }
}
const getScopeQuery = (accessToken: string) => {
    return token.verify(accessToken);
}

export {
    token,
    getScopeQuery
}
import jwt from 'jsonwebtoken';

const token = {
    generateToken: (payload: { email: string, accountId: string }) => {
        const SECRET_KEY = process.env.SECRET_KEY;
        const token = jwt.sign(payload, SECRET_KEY, {
            expiresIn: 60 * 5
        });
        return token;
    },
    verify: () => {

    }
}
export {
    token
}
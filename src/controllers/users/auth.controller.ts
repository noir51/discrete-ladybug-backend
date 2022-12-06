'use strict';

export const authController = {
    register: async (req: any, res: any, next: any) => {
        try {
            const dateOfBirth = new Date(Date.parse(req.body.date_of_birth));
            const monthNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

            return res.status(200).json({
                full_name: `${req.body.first_name} ${req.body.last_name}`,
                email: `${req.body.email}`,
                identifiable_info: `${req.body.ssn}, ID: ${req.body.id_number}`,
                date_of_birth: `${dateOfBirth.getFullYear()}, ${monthNames[dateOfBirth.getMonth()]} ${dateOfBirth.getDate()}`
            });
        } catch (error) {
            next(error);
        }
    }
};
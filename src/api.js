export const get = uri => new Promise(
    resolve => {
        let response;
        switch (uri) {
            case '/products':
                response = [
                    {
                        id: 1,
                        name: 'Mastering Docker - Second Edition',
                        author: 'James Cameron',
                        img: 'https://www.shopbay.org/media/assets/preview/62.jpg',
                        price: 39.58,    
                        discount: 20,
                    },
                    {
                        id: 2,
                        name: 'Build Mobile App - React Native',
                        author: 'Julie Happy',
                        img: 'https://www.shopbay.org/media/assets/preview/69.jpg',
                        price: 100.98,    
                        discount: 50,
                    },
                    {
                        id: 3,
                        name: 'Go Cookbook',
                        author: 'Robinson',
                        img: 'https://www.shopbay.org/media/assets/preview/75.jpg',
                        price: 75.15,    
                        discount: 10,
                    },
                ];
                break;
            default:
                return null;
        }
        
        setTimeout( ()=>resolve(response), 1000);
        return null;
    }
);

export const post = (uri,data) => new Promise(
    (resolve, reject) => {
        let response;
        switch (uri) {
            case '/login':
                if (data.email === 'test@test.com' && data.password === 'test') {
                    response = {
                        email: 'test@test.com',
                        name: 'Test Testson',
                        address: '123 test street',
                        postcode: '2761XZ',
                        city: 'Testington'
                    };
                } else {
                    setTimeout( () => reject('Unauthorized'), 1000);
                    return null;
                }
                break;
            case '/pay':
                if (data.card.cvc === '123') {
                    response = true;
                } else {
                    setTimeout( () => reject('Payment not authorized'), 1000);
                    return null;
                }
                break;
            case '/register':
                response = data;
                break;
            default:
                return null;
        }

        setTimeout( () => resolve(response), 1000);
        return null;
    }
);

export const put = () => {};
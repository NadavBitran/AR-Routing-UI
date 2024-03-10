import './styles.css';
import { useFlag } from '../../common/hooks/';

import { URL } from '../../common/constants/serverurl';

export default function SendDataToServer({ json }) {
    const {
        flag: isDataSent,
        enable: enableDataSent,
    } = useFlag();
    

    const submitData = async (event) => {    

        event.preventDefault();

        enableDataSent();

        await fetch(URL , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        });    
    }

        return (        
            <form onSubmit={submitData}>
                {
                    isDataSent ? (
                        <p>Thank you for submitting your data</p>
                    ) : (
                        <button type="submit">Send Data To The Server!</button>
                    )
                }
            </form>
        );
}



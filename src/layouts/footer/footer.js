const Footer = ({buttonsKey, buttonsContent, buttonOnClickIndicator }) => {
    return (
        <footer className={"app__footer"}>
            {buttonsContent.map((content, index) => (
                <button
                        key={buttonsKey[index]} 
                        onClick={() => buttonOnClickIndicator(buttonsKey[index])}> 
                        {content}
                </button>
            ))}
        </footer>
    )
}

export default Footer;
function EcosiaResults({ results }) {
    debugger

    return <section className="results">
        {results.length ?
            <ul>{results.map(({ title, content, link }) => {
                return <>
                    <h2>{`${title}`}</h2>
                    <p>{`${content}`}</p>
                    <a href={`${link}`}>{`${link}`}</a>
                </>
            })}</ul>

            : <Feedback message="sorry, no results :(" level="warning" />}
    </section>


}
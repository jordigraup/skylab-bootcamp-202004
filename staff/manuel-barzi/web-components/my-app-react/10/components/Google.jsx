function Google({ onSearch, query, results }) {
    function handleSearch(query) {
        google(query, (error, results) => {
            if (error) throw error // TODO do something with error (feedback panel?) 

            onSearch(results, query)
        })
    }

    return <section className="google">
        <h2>Google</h2>

        <Search onSubmit={handleSearch} query={query} />
        {results && <GoogleResults results={results} />}
    </section >
}
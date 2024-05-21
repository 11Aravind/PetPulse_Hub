import ReactSearchBox from "react-search-box";
const Searchbox=()=>{
    const data = [
        {
            key: "john",
            value: "John Doe",
        },
        {
            key: "jane",
            value: "Jane Doe",
        },
        {
            key: "mary",
            value: "Mary Phillips",
        },
        {
            key: "robert",
            value: "Robert",
        },
        {
            key: "karius",
            value: "Karius",
        },
    ];
    return(
        <>
          <ReactSearchBox
                placeholder="Start typing to filter..."
                value="Doe"
                data={data}
                leftIcon={<>🎨</>}
                iconBoxSize="48px"
                onFocus={() => {
                    console.log("This function is called when is focussed");
                }}
                onChange={(value) => console.log(value)}
                autoFocus
                callback={(record) => console.log(record)}
            />
        </>
    )
}
export default Searchbox;
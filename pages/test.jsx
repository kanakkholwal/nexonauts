import { parse } from 'rss-to-json';


export default function Test({data}) {
    console.log(data);
    return (
        <div>
        <h1>Test</h1>
        {JSON.stringify(data)}
        </div>
    )
}
export async function getServersideProps(context){
    var rss = await parse('https://medium.com/feed/@kanakkholwal');
    console.log(JSON.stringify(rss, null, 3));

    return {
        props: {data:rss}
    }
}
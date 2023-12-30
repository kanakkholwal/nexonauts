const testinomials = [
    {
        id: 1,
        name: 'Daniella Doe',
        job: 'Mobile dev',
        avatar: './images/avatars/avatar.webp',
        review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum aliquid quo eum quae quos illo earum ipsa doloribus nostrum minus libero aspernatur laborum cum, a suscipit, ratione ea totam ullam! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto laboriosam deleniti aperiam ab veniam sint non cumque quis tempore cupiditate. Sint libero voluptas veniam at reprehenderit, veritatis harum et rerum.'
    },
    {
        id: 2,
        name: 'Jane Doe',
        job: 'Marketing',
        avatar: './images/avatars/avatar-1.webp',
        review: 'Lorem ipsum dolor laboriosam deleniti aperiam ab veniam sint non cumque quis tempore cupiditate. Sint libero voluptas veniam at reprehenderit, veritatis harum et rerum.'
    },
    {
        id: 3,
        name: 'Yanick Doe',
        job: 'Developer',
        avatar: './images/avatars/avatar-2.webp',
        review: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto laboriosam deleniti aperiam ab veniam sint non cumque quis tempore cupiditate. Sint libero voluptas veniam at reprehenderit, veritatis harum et rerum.'
    },
    {
        id: 4,
        name: 'Jane Doe',
        job: 'Mobile dev',
        avatar: './images/avatars/avatar-3.webp',
        review: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto laboriosam deleniti aperiam ab veniam sint non cumque quis tempore cupiditate. Sint libero voluptas veniam at reprehenderit, veritatis harum et rerum.'
    },
    {
        id: 5,
        name: 'Andy Doe',
        job: 'Manager',
        avatar: './images/avatars/avatar-4.webp',
        review: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto laboriosam deleniti aperiam ab veniam sint non cumque quis tempore cupiditate. Sint libero voluptas veniam at reprehenderit, veritatis harum et rer'
    }
]

export default function Testinomials() {

    return (<div className="text-gray-600 dark:text-gray-300" id="reviews">
    <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
        <div className="mb-20 space-y-4 px-6 md:px-0">
            <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-white md:text-4xl">
                We have some fans.
            </h2>
        </div>
        <div className="md:columns-2 lg:columns-3 gap-8 space-y-8">
        {testinomials.map((testinomial) => {
            return (
                <div key={testinomial.id} className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none">
                    <div className="flex gap-4">
                        <img className="w-12 h-12 rounded-full" src={testinomial.avatar} alt="user avatar" width={200} height={200} loading="lazy" />
                        <div>
                            <h6 className="text-lg font-medium text-gray-700 dark:text-white">{testinomial.name}</h6>
                            <p className="text-sm text-gray-500 dark:text-gray-300">{testinomial.job}</p>
                        </div>
                    </div>
                    <p className="mt-8">{testinomial.review}</p>
                </div>
            )
        })}
    
        </div>
    </div>
</div>)
}
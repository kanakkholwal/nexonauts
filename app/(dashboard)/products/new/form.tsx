"use client"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { UploadImage } from "src/components/uploader"
import { z } from "zod"




const formSchema = z.object({
    name: z.string().min(3).max(100),
    description: z.string().min(10).max(1000),
    published: z.boolean(),
    url: z.string().url(),
    preview_url: z.string().url({
        message: 'Preview URL must be a valid image URL'
    }),
    tags: z.array(z.string()),
    categories: z.array(z.string()),
    price: z.string(),
})
const defaultCategories = [
    "Design",
    "Course",
    "Productivity",
    "Themes",
    "Templates",
    "UI Kits",

] as const
interface Props {
    saveProduct: (product: z.infer<typeof formSchema>) => Promise<boolean>
}
export default function ProductForm(props: Props) {
    // ...
    // 1. Define your form.
    const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            published: false,
            url: "",
            preview_url: "",
            tags: [],
            categories: [],
            price: "0",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
        setLoading(true)
        toast.promise(props.saveProduct(values), {
            loading: "Saving product...",
            success: "Product saved!",
            error: "Error saving product",
        })
            .then((result) => {
                if (result) {
                    form.reset()
                }
            })
            .finally(() => {
                setLoading(false)
            })


    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-5 justify-around items-start flex-col md:flex-row">

                <div className="flex flex-col gap-4 w-full">

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="My Product" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Description (Markdown preferred)
                                </FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Description"
                                        rows={8} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Buying URL
                                    <span className="text-sm text-gray-500 ml-2">
                                        (Gumroad, Sellfy, etc.)
                                    </span>
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="https://username.gumroad.com/l/product" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tags</FormLabel>
                                <FormControl>
                                    <Input placeholder="tag1, tag2, tag3" {...field}
                                        value={field.value?.join(', ')}
                                        onChange={(e) => {
                                            field.onChange(e.target.value.split(',').map((tag) => tag.trim()))
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="categories"
                        render={() => (
                            <FormItem>
                                <div className="mb-4">
                                    <FormLabel className="text-base">Categories</FormLabel>
                                    <FormDescription>
                                        Select the categories that best describe your product.
                                    </FormDescription>
                                </div>
                                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
                                    {defaultCategories.map((item, index) => (
                                        <FormField
                                            key={item + "_" + index}
                                            control={form.control}
                                            name="categories"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem
                                                        key={item}
                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                    >
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value?.includes(item)}
                                                                onCheckedChange={(checked) => {
                                                                    return checked
                                                                        ? field.onChange([...field.value, item])
                                                                        : field.onChange(
                                                                            field.value?.filter(
                                                                                (value) => value !== item
                                                                            )
                                                                        )
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="font-normal cursor-pointer">
                                                            {item}
                                                        </FormLabel>
                                                    </FormItem>
                                                )
                                            }}
                                        />
                                    ))}
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />



                </div>
                <div className="flex flex-col gap-4 flex-0 glassmorphism_light p-5 rounded-xl w-full md:min-w-[24rem] md:max-w-md mx-auto">

                    <FormField
                        control={form.control}
                        name="preview_url"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>
                                    Preview URL
                                    <span className="text-sm text-gray-500"> (preffered 16 / 9)</span>
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="https://example.com/preview.png" {...field} />
                                </FormControl>
                                <UploadImage
                                    key={"preview_url"}
                                    onUpload={(fileUrl) => {
                                        field.onChange(fileUrl)
                                    }}
                                />
                                {((fieldState.isTouched && !fieldState.isDirty && fieldState.invalid === false) || form.getValues("preview_url").length > 20) && (<>
                                    <div>
                                        <Image src={field.value} width={512} height={320} alt={"preview image"} />
                                    </div>
                                </>)}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price (USD)
                                    <span className="text-sm text-gray-500"> (leave blank for Free)</span>
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="10.00" {...field}
                                        type="number" step="0.01" min="0"
                                        value={field.value?.toString() ?? ''}
                                        onChange={(e) => {
                                            field.onChange(parseFloat(e.target.value))
                                        }}

                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="published"
                        render={({ field }) => (
                            <FormItem className="flex items-center justify-between gap-2 space-y-0 w-full py-3">
                                <FormLabel className="mb-0">Published</FormLabel>
                                <FormControl>
                                    <Switch checked={field.value}
                                        onCheckedChange={field.onChange} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit"
                        className="w-full max-w-sm"
                        disabled={loading}>
                        Save Changes
                    </Button>
                </div>
            </form>
        </Form>
    )
}

import Select from '../components/Ui/Select'
import Input from '../components/Ui/Input'
import { Award, BadgeCheck, MailOpen, SquareUser } from 'lucide-react'

function Create_newsletter_from() {

    const handleSubmit = async () => {

    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='max-h-[60vh] overflow-y-scroll px-2'>
                <div className="text-sm text-gray-800">
                    Newsletters on LinkedIn allow you to share your perspective regularly by publishing articles at the cadence you choose. Your subscribers will receive a push notification and email after each new edition of your newsletter. Limit 5 newsletters per member.
                </div>
                <div className='pt-4 flex flex-col gap-4'>
                    <h1 className='text-md font-semibold'>Newsletter details</h1>
                    <div className='flex gap-2'>
                        <div className='flex-grow'>
                            <Input
                                label="Newsletter title"
                                placeholder={"Add title to your newsletter"}
                            />
                        </div>
                        <div>
                            <Select
                                label={"How often do you want to publish?"}
                                list={["Select one", "Daily", "Weekly", "Monthly"]}
                            />
                        </div>
                    </div>

                    <Input
                        label="Newsletter description"
                        placeholder={"Add description to your newsletter"}
                    />

                    <div className="border rounded-lg p-4">
                        <div className="flex items-center gap-4 mb-2">
                            <SquareUser className="h-16 w-16 text-gray-400" />
                            <div>
                                <p className="font-medium">Add an image or logo for your newsletter to increase engagement.</p>
                                <p className="text-sm text-gray-500">The recommended image size is 300x300 pixels.</p>
                            </div>
                        </div>
                        <button className="mt-2 border border-gray-400 hover:bg-gray-200 hover:border-gray-500 py-2 px-4 rounded-lg">Upload image</button>
                    </div>

                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="h-8 w-8 text-gray-400">
                                    <MailOpen className="h-8 w-8 text-gray-400" />
                                </div>
                            </div>
                            <div>
                                <h4 className="font-medium">Your connections and followers will be invited to subscribe</h4>
                                <p className="text-sm text-gray-600">We&apos;ll notify your network when you publish the first edition of your newsletter and invite new followers to subscribe.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="h-8 w-8 text-gray-400">
                                    <BadgeCheck className="h-8 w-8 text-gray-400"/>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-medium">You will be subscribed to your newsletter</h4>
                                <p className="text-sm text-gray-600">We&apos;ll send you a copy of the notification and email that we send to your subscribers.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="h-8 w-8 text-gray-400">
                                    <Award className="h-8 w-8 text-gray-400"/>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-medium">Your newsletter will be featured on your profile</h4>
                                <p className="text-sm text-gray-600">We&apos;ll add your newsletter to the Featured section on your profile when you publish your first edition.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="mt-8 border-t pt-4 border-gray-300 flex justify-end">
                <button className='bg-[#0a66c2] px-4 py-1 rounded-full text-white font-semibold text-md' type="submit">
                    Create
                </button>
            </div>
        </form>
    )
}

export default Create_newsletter_from

import React, { useState, useEffect } from 'react'
import Navbar from './Components/Navbar'
import alanBtn from '@alan-ai/alan-sdk-web'

function App() {

    const [cart, setCart] = useState([])
    const [menuItems, setMenuItems] = useState([])

    useEffect(() => {
        alanBtn({
            key: '01f89ced1cb7b0f892d5190a5d2a15d42e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: (commandData) => {
                if (commandData.command === 'getMenu') {
                    setMenuItems(commandData.data)
                } else if (commandData.command === 'addToCart') {
                    addToCart(commandData.data)
                }

            }
        });
    }, [])

    const addToCart = (menuItem) => {
        setCart((oldCart) => {
            return [...oldCart, menuItem]
        })
    }

    return (
        <div className='bg-slate-300'>
            <div>
                <Navbar />
            </div>

            <div className='flex justify-between m-5'>
                <div>
                    {menuItems.map(menuItem => (
                        <div class="flex justify-center">
                            <div class="block rounded-lg shadow-lg bg-white max-w-sm text-center m-5">
                                <div class="py-3 px-6 border-b border-gray-300">
                                    {menuItem.category}
                                </div>
                                <div class="p-6">
                                    <h5 class="text-gray-900 text-xl font-medium mb-2">{menuItem.name}</h5>
                                    <p class="text-gray-700 text-base mb-4">
                                        This is a voice control Ecommerce website. using react JS and Alan AI
                                    </p>
                                    <button type="button" class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" onClick={() => addToCart(menuItem)}>Buy Now</button>
                                </div>
                                <div class="py-3 px-6 border-t border-gray-300 text-gray-600">
                                    {menuItem.price} Taka
                                </div>
                            </div>
                        </div>

                    ))}
                </div>


                <div>
                    <h2>Cart</h2>
                    {cart.map(cartItem => (
                        <div class="flex justify-center m-5">
                            <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
                                <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">{cartItem.name}</h5>
                                <p class="text-gray-700 text-base mb-4">
                                    This is a very good {cartItem.name}
                                </p>
                                <button type="button" class=" inline-block px-6 py-2.5 bg-orange-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">{cartItem.price} Taka</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default App
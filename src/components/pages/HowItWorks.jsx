export default function HowItWorks() {
  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          How it Works
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Card 1: Open the App */}
          <div className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-lg transition">
            <img
              src="https://static.vecteezy.com/system/resources/previews/004/999/424/non_2x/fast-delivery-service-concept-hand-holding-smart-phone-open-app-image-cartoon-illustration-isolated-on-white-background-free-vector.jpg"
              alt="Open App"
              className="w-24 h-24 mx-auto mb-4 rounded-lg object-cover"
            />
            <h3 className="text-lg font-semibold mb-2">Open the app</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Browse from thousands of products – groceries, fresh fruits & veggies, beauty, pet care & more
            </p>
          </div>

          {/* Card 2: Place Order */}
          <div className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-lg transition">
            <img
              src="https://static.vecteezy.com/system/resources/previews/066/741/937/non_2x/icon-representing-a-complete-cart-full-cart-trolley-groceries-purchase-shopping-marketing-basket-online-shopping-supermarket-buy-vector.jpg"
              alt="Place Order"
              className="w-24 h-24 mx-auto mb-4 rounded-lg object-cover"
            />
            <h3 className="text-lg font-semibold mb-2">Place an order</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Add your favorites to cart, apply offers & checkout in seconds
            </p>
          </div>

          {/* Card 3: Premium Benefits - Fast & Free Delivery */}
          <div className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-lg transition border-2 border-yellow-400 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-yellow-400 text-white px-4 py-1 text-xs font-bold rounded-bl-lg">
              PREMIUM
            </div>
            <img
              src="https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/0a/f9/5c/0af95c8c-8a59-a070-069e-818dd94d34ed/AppIcon-0-0-1x_U007emarketing-0-11-0-85-220.png/1200x630wa.png"
              alt="Lightning Fast Delivery"
              className="w-24 h-24 mx-auto mb-4 rounded-lg object-cover"
            />
            <h3 className="text-lg font-semibold mb-2">Lightning-fast delivery</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Get unlimited free deliveries & exclusive perks in just 10 minutes with premium membership
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongoose";
import Order from "../../../../models/Order";

export async function GET(request) {
  await connectDB();

  const { searchParams } = new URL(request.url);
  const restaurantId = searchParams.get("restaurantId");

  if (!restaurantId) {
    return NextResponse.json({ error: "Restaurant ID is required" }, { status: 400 });
  }

  try {
    console.log("📦 Finding orders for restaurantId:", restaurantId);

    const orders = await Order.find({ restaurantId });

    console.log("✅ Orders fetched from DB:", orders);

    const formattedOrders = [];

    orders.forEach(order => {
      if (Array.isArray(order.items)) {
        order.items.forEach(item => {
          formattedOrders.push({
            name: item.name,
            price: item.price,
            total: item.quantity,
            userId: order.userId,
            orderDate: order.orderDate
          });
        });
      }
    });

    console.log("🧾 Formatted orders:", formattedOrders);

    return NextResponse.json({ success: true, orders: formattedOrders }, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching orders:", error.message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

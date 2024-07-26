import orders from "@/assets/data/orders";
import OrderItemListItem from "@/src/components/OrderListItem";
import { Text, FlatList } from "react-native";

export default function OrdersScreen() {
    return (
        <FlatList 
            data={orders}
            renderItem={({ item }) => <OrderItemListItem order={item} />}
            contentContainerStyle={{ gap: 10, padding: 10 }}
        />
    )
}
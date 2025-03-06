import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  Pressable
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

// Type Definitions
type HealthItem = {
  id: string;
  title: string;
  value: string;
  time: string;
  icon: string;
  color: string;
};

type ActivityItem = {
  id: string;
  title: string;
  image: string;
};


// Dummy Health Information
const healthData: HealthItem[] = [
  { id: "1", title: "Glucose", value: "▲102 mg/dl", time: "12 min ago", icon: "heartbeat", color: "#FDEDD3" },
  { id: "2", title: "Vitality", value: "4 out of 5", time: "2d ago", icon: "medal", color: "#EADCFD" },
  { id: "3", title: "Heart Rate", value: "78 bpm", time: "5 min ago", icon: "heart", color: "#D3EAFD" },
  { id: "4", title: "Steps", value: "7,512", time: "Today", icon: "shoe-prints", color: "#DEF3D8" },
];

// Dummy Activities
const activities: ActivityItem[] = [
  { id: "1", title: "Meditate for focus", image: "https://via.placeholder.com/150" },
  { id: "2", title: "Running", image: "https://via.placeholder.com/150" },
  { id: "3", title: "Cycling", image: "https://via.placeholder.com/150" },
  { id: "4", title: "Swimming", image: "https://via.placeholder.com/150" },
];

const goals = [
    { id: "1", title: "Today's Goal", description: "Practice 10 minutes of meditation with deep breathing exercises." },
    { id: "2", title: "Stay Hydrated", description: "Drink at least 8 glasses of water today to stay hydrated." },
    { id: "3", title: "Step Challenge", description: "Take at least 10,000 steps today for a healthy lifestyle." },
    { id: "4", title: "Get Enough Sleep", description: "Aim for at least 7-8 hours of sleep for better recovery." },
  ];

export default function HealthDashboard(): JSX.Element {
  const [selectedTab, setSelectedTab] = useState<string>("home");

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome,</Text>
          <Text style={styles.userName}>Noah!</Text>
        </View>
        <View>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/45.jpg" }}
            style={styles.profilePic}
          />
          <Text style={styles.levelText}>Level 1</Text>
        </View>
      </View>

      {/* HEALTH STATS */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.healthScroll}>
        {healthData.map((item) => (
          <View key={item.id} style={[styles.healthCard, { backgroundColor: item.color }]}>
            <FontAwesome5 name={item.icon} size={20} color="black" />
            <Text style={styles.healthTitle}>{item.title}</Text>
            <Text style={styles.healthValue}>{item.value}</Text>
            <Text style={styles.healthTime}>{item.time}</Text>
          </View>
        ))}
      </ScrollView>

      {/* DAILY GOAL CARD */}
      {/* <View style={styles.goalCard}>
        <Text style={styles.goalTitle}>Today's Goal</Text>
        <Text style={styles.goalText}>
          Practice 10 minutes of meditation with deep breathing exercises
        </Text>
        <Ionicons name="chatbox-outline" size={20} color="black" style={styles.goalIcon} />
      </View> */}

      <FlatList 
        horizontal
        showsHorizontalScrollIndicator
        pagingEnabled
        bounces={false}
        data={goals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <View style={styles.goalCard}>
                <Text style={styles.goalTitle}>Today's Goal</Text>
                <Text style={styles.goalText}>
                {item.description}
                </Text>
                <Ionicons name="chatbox-outline" size={20} color="black" style={styles.goalIcon} />
            </View>
      )}/>

     

      {/* ACTIVITIES */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={activities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.activityCard}>
            <Image source={{ uri: item.image }} style={styles.activityImage} />
            <Text style={styles.activityTitle}>{item.title}</Text>
          </View>
        )}
      />

      {/* BOTTOM NAVIGATION */}
      <View style={styles.bottomNav}>
        <Pressable onPress={() => setSelectedTab("home")}>
          <Ionicons
            name="home-outline"
            size={30}
            color={selectedTab === "home" ? "black" : "gray"}
          />
        </Pressable>
        <Pressable onPress={() => setSelectedTab("stats")}>
          <MaterialCommunityIcons
            name="chart-bar"
            size={30}
            color={selectedTab === "stats" ? "black" : "gray"}
          />
        </Pressable>
        <Pressable onPress={() => setSelectedTab("add")} style={styles.addButton}>
          <Ionicons name="add" size={30} color="white" />
        </Pressable>
        <Pressable onPress={() => setSelectedTab("community")}>
          <Ionicons
            name="people-outline"
            size={30}
            color={selectedTab === "community" ? "black" : "gray"}
          />
        </Pressable>
        <Pressable onPress={() => setSelectedTab("profile")}>
          <Ionicons
            name="person-outline"
            size={30}
            color={selectedTab === "profile" ? "black" : "gray"}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F8F8", paddingHorizontal: 20, paddingTop: 50 },

  // HEADER
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  welcomeText: { fontSize: 25, fontWeight: "bold" },
  userName: { fontSize: 25, fontWeight: "bold" },
  profilePic: { width: 50, height: 50, borderRadius: 10 },
  levelText: { textAlign: "center", fontWeight: "bold", fontSize: 12, marginTop: 5,},

  // HEALTH STATS
  healthScroll: { marginBottom: 10, height: 1},
  healthCard: { width: 140, padding: 15, borderRadius: 15, marginRight: 10, height: '100%' },
  healthTitle: { fontSize: 16, fontWeight: "bold", marginTop: 5 },
  healthValue: { fontSize: 14, marginTop: 5 },
  healthTime: { fontSize: 12, color: "gray", marginTop: 3 },

  // GOAL CARD
  goalScroll: { marginBottom: 10, height: 1, width: 100},
  goalCard: {width: 347, padding: 10, marginRight: 10, borderRadius: 20,height: '50%', borderWidth: 1.5 },
  goalTitle: { fontSize: 16, fontWeight: "bold" },
  goalText: { fontSize: 14, color: "gray", marginTop: 5 },
  goalIcon: { position: "absolute", right: 10, top: 10 },

  // ACTIVITIES
  activityCard: { width: 140, alignItems: "center", marginRight: 15 },
  activityImage: { width: 130, height: 100, borderRadius: 15, backgroundColor: 'red' },
  activityTitle: { marginTop: 5, fontSize: 14 },

  // BOTTOM NAVIGATION
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#E0E0E0",
    position: "absolute",
    bottom: 10,
    left: 20,
    right: 20,
    borderRadius: 30,
  },
  addButton: {
    backgroundColor: "#4A90E2",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});

import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {Link, Tabs} from 'expo-router';
import {Pressable} from 'react-native';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#bf4f74",
        tabBarStyle: { backgroundColor: '#1f0a26' },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Lista de tarefas',
          headerTintColor: "#1f0a26",
          headerStyle: { backgroundColor: "#bf4f74", textAlign: "center" },
          tabBarLabel: () => null,
          tabBarIcon: ({ color }) => <TabBarIcon size={24} name="list" color={color} />,
          headerRight: () => (
            <Link href="/CreateTask" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="plus"
                    size={25}
                    color="#1f0a26"
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Tabs>
  );
}
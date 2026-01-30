import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UtensilsCrossed, Clock, Save, Plus, X, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MenuItem {
  id: number;
  name: string;
}

interface MealTiming {
  meal: string;
  startTime: string;
  endTime: string;
  items: MenuItem[];
}

const initialTimings: MealTiming[] = [
  {
    meal: "Breakfast",
    startTime: "07:00",
    endTime: "09:00",
    items: [
      { id: 1, name: "Poha" },
      { id: 2, name: "Bread & Butter" },
      { id: 3, name: "Milk" },
      { id: 4, name: "Tea/Coffee" },
      { id: 5, name: "Boiled Eggs" },
    ],
  },
  {
    meal: "Lunch",
    startTime: "12:30",
    endTime: "14:00",
    items: [
      { id: 1, name: "Rice" },
      { id: 2, name: "Dal" },
      { id: 3, name: "Paneer Curry" },
      { id: 4, name: "Roti" },
      { id: 5, name: "Salad" },
      { id: 6, name: "Curd" },
    ],
  },
  {
    meal: "Dinner",
    startTime: "19:30",
    endTime: "21:00",
    items: [
      { id: 1, name: "Rice" },
      { id: 2, name: "Mixed Veg" },
      { id: 3, name: "Chapati" },
      { id: 4, name: "Dal Fry" },
      { id: 5, name: "Pickle" },
      { id: 6, name: "Sweet" },
    ],
  },
];

const ManagerMenu = () => {
  const { toast } = useToast();
  const [timings, setTimings] = useState<MealTiming[]>(initialTimings);
  const [editingMeal, setEditingMeal] = useState<string | null>(null);
  const [newItem, setNewItem] = useState("");

  const handleSaveTimings = (meal: string) => {
    setEditingMeal(null);
    toast({
      title: "Menu updated!",
      description: `${meal} menu and timings have been saved.`,
    });
  };

  const handleAddItem = (mealIndex: number) => {
    if (!newItem.trim()) return;
    
    const updated = [...timings];
    updated[mealIndex].items.push({
      id: Date.now(),
      name: newItem.trim(),
    });
    setTimings(updated);
    setNewItem("");
  };

  const handleRemoveItem = (mealIndex: number, itemId: number) => {
    const updated = [...timings];
    updated[mealIndex].items = updated[mealIndex].items.filter(i => i.id !== itemId);
    setTimings(updated);
  };

  const handleTimeChange = (mealIndex: number, field: "startTime" | "endTime", value: string) => {
    const updated = [...timings];
    updated[mealIndex][field] = value;
    setTimings(updated);
  };

  return (
    <DashboardLayout role="manager">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-1">
            Menu & Timings
          </h1>
          <p className="text-muted-foreground">Manage daily menu and meal schedules</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Tabs defaultValue="breakfast" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
              <TabsTrigger value="lunch">Lunch</TabsTrigger>
              <TabsTrigger value="dinner">Dinner</TabsTrigger>
            </TabsList>

            {timings.map((timing, index) => (
              <TabsContent key={timing.meal} value={timing.meal.toLowerCase()}>
                <Card className="border-border/50 shadow-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <UtensilsCrossed className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle>{timing.meal}</CardTitle>
                          <CardDescription>
                            {timing.startTime} - {timing.endTime}
                          </CardDescription>
                        </div>
                      </div>
                      {editingMeal === timing.meal ? (
                        <Button onClick={() => handleSaveTimings(timing.meal)} className="gap-2">
                          <Save className="w-4 h-4" />
                          Save Changes
                        </Button>
                      ) : (
                        <Button variant="outline" onClick={() => setEditingMeal(timing.meal)} className="gap-2">
                          <Edit className="w-4 h-4" />
                          Edit
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Timings */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          Start Time
                        </Label>
                        <Input
                          type="time"
                          value={timing.startTime}
                          onChange={(e) => handleTimeChange(index, "startTime", e.target.value)}
                          disabled={editingMeal !== timing.meal}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          End Time
                        </Label>
                        <Input
                          type="time"
                          value={timing.endTime}
                          onChange={(e) => handleTimeChange(index, "endTime", e.target.value)}
                          disabled={editingMeal !== timing.meal}
                        />
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="space-y-3">
                      <Label>Menu Items</Label>
                      <div className="flex flex-wrap gap-2">
                        {timing.items.map((item) => (
                          <Badge 
                            key={item.id} 
                            variant="secondary" 
                            className="px-3 py-1.5 text-sm gap-2"
                          >
                            {item.name}
                            {editingMeal === timing.meal && (
                              <button
                                onClick={() => handleRemoveItem(index, item.id)}
                                className="hover:text-destructive transition-colors"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            )}
                          </Badge>
                        ))}
                      </div>

                      {editingMeal === timing.meal && (
                        <div className="flex gap-2 mt-3">
                          <Input
                            placeholder="Add new item..."
                            value={newItem}
                            onChange={(e) => setNewItem(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleAddItem(index)}
                          />
                          <Button 
                            variant="outline" 
                            onClick={() => handleAddItem(index)}
                            className="gap-2"
                          >
                            <Plus className="w-4 h-4" />
                            Add
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default ManagerMenu;

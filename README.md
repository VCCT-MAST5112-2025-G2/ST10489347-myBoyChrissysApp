# ST10489347 MAST-PART 2 
- Youtube Video Link: https://youtu.be/r2v14E5zVe0?si=nkGyK1c-8HWKf7To
# Github Repo link 
https://github.com/VCCT-MAST5112-2025-G2/ST10489347-myBoyChrissysApp.git

# Change Log 
-
v1.0.0 – [2025-10-16]

Initial release of the Menu Management App.
Implemented base React Native structure with TypeScript support imported basic structural imports such as safeareaview, use states for hooking 
Added ability to create and display menu items dynamically this was done by creating a type which was only based  on 3 courses used a modal import from react to pop up and show the form 

v1.1.0 – [2025-10-18]

Integrated unique ID generation using react-native-uuid.
Introduced form error handling with inline feedback we used conditional logic to check for validation 
Added grouping logic for displaying menu items by course (Starter/Main/Dessert) 

v1.2.0 – [2025-10-22]

Added edit functionality with pre-filled modal fields.
Improved input validation for missing fields and invalid price values.
Added confirmation dialog before deleting menu items. 
Enhanced UI state handling (modal visibility, reset form logic).
and finished up styling using blue colours which were themed for the application use of linearGrad import as well for background styling

v2.0.0 – [2025-11-11]

Major app restructuring: Separated all logic from App.tsx into individual screens for modularity and cleaner architecture.
Implemented multi-screen navigation using React Navigation (Stack Navigator) with three screens: HomeScreen, ChefScreen, and FilterScreen.
Introduced global state management via MenuContext to enable real-time data sharing between screens (Home and Chef share the same menu items).
Refactored ChefScreen:
Integrated uuid for generating unique dish IDs.
Enhanced modal behavior for add/edit operations, including form validation and automatic field resets.
Added navigation button ( Back to Home) for seamless screen transitions.
Created HomeScreen to display all menu items dynamically grouped by course type (Starters, Mains, Desserts).
Added FilterScreen for filtering and viewing dishes based on selected categories (under development for advanced filters).
Enhanced UI visuals:
Applied consistent blue gradient backgrounds using expo-linear-gradient.
Incorporated frosted-glass effects via expo-blur for a modern, minimal look.
Improved layout spacing, scroll behavior, and overall responsiveness.
Improved TypeScript integration:
Defined RootStackParamList for strong type safety across navigation.
Enforced type definitions for all menu item structures and context props.

# Youtube Video link 
- Code description and implementation: https://youtu.be/N_LDmuLD6mc
- Running app: https://youtu.be/4mQG9LP_1Sg

import React from "react";

const UserProfile = () => {
  return (
    <div>
      <nav class="py-4">
        <div class="w-80 mx-auto flex justify-between items-center">
          <div class="flex items-center space-x-4">
            <button class="bg-blue-300 border border-black rounded p-2 text-black ml-0 hover:bg-blue-400">
              Back
            </button>
            <select class="bg-white border border-black rounded p-2">
              <option value="country1">Country 1</option>
              <option value="country2">Country 2</option>
              <option value="country3">Country 3</option>
            </select>
            <div class="bg-white border border-black rounded p-2">
              <span>00:00:00</span>
            </div>
            <button class="bg-blue-300 border border-black rounded p-2 text-black hover:bg-blue-400">
              Start
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default UserProfile;

import { Routes, Route } from "react-router-dom";
import Home from "@/components/sections/Page.tsx";
import AccountShared from "@/components/sections/accountShared.tsx";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shared" element={<AccountShared />} />
        </Routes>
    );
};

export default Router;

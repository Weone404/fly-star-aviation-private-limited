import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";

export default function Airlinetransportpilotlicence() {
    return (
        <Layout>
            <Helmet>
                <title>Airline Transport Pilot Licence | ATPL Information</title>
                <meta
                    name="description"
                    content="Overview of Airline Transport Pilot Licence (ATPL) pathway, eligibility and steps to become an airline pilot."
                />
            </Helmet>
            <section className="py-24">
                <div className="container">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <h1 className="text-3xl font-bold mb-4">Airline Transport Pilot Licence (ATPL)</h1>
                        <p className="text-muted-foreground">Basic overview page. Content coming soon.</p>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
}

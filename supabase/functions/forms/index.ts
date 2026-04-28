import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const url = new URL(req.url);
    const path = url.pathname.replace("/forms", "").replace("/", "");

    const body = await req.json();

    if (path === "contact") {
      const { name, firma, rolle, email, telefon, nachricht } = body;

      if (!name || !firma || !email || !nachricht) {
        return new Response(
          JSON.stringify({ error: "Pflichtfelder fehlen" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const { error } = await supabase.from("contact_submissions").insert({
        name,
        firma,
        rolle: rolle || "",
        email,
        telefon: telefon || "",
        nachricht,
      });

      if (error) throw error;

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (path === "assessment") {
      const {
        name,
        firma,
        email,
        mitarbeitende,
        endpoints,
        server,
        cloud,
        security_tools,
        need_24_7,
        branche,
        compliance,
      } = body;

      if (!name || !firma || !email) {
        return new Response(
          JSON.stringify({ error: "Pflichtfelder fehlen" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const { error } = await supabase
        .from("assessment_submissions")
        .insert({
          name,
          firma,
          email,
          mitarbeitende: mitarbeitende || "",
          endpoints: endpoints || "",
          server: server || "",
          cloud: cloud || "",
          security_tools: security_tools || [],
          need_24_7: need_24_7 || "",
          branche: branche || "",
          compliance: compliance || [],
        });

      if (error) throw error;

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || "Serverfehler" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

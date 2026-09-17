import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title, category, type, format, mode, map, allowedWeapons, rules,
      entryFee, prizePool, winnerPrize, perKill, totalSlots,
      matchDate, matchTime, startTime, bannerUrl, prizesJson,
      isFeatured, roomId, roomPassword,
      entryFeeModel, matchType, maxTeams, teamSize,
    } = body;

    if (!title) {
      return NextResponse.json({ success: false, error: "Tournament title is required." }, { status: 400 });
    }

    const id = `eg-${(category || "ff").toLowerCase().replace(/\s+/g, "-")}-${Date.now().toString().slice(-5)}`;
    let parsedStartTime: Date;
    if (startTime) {
      const d = new Date(startTime);
      parsedStartTime = isNaN(d.getTime()) ? new Date(Date.now() + 1000 * 60 * 60 * 24) : d;
    } else {
      parsedStartTime = new Date(Date.now() + 1000 * 60 * 60 * 24);
    }


    const created = await prisma.tournament.create({
      data: {
        id,
        title: title.trim().toUpperCase(),
        slug: `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now().toString().slice(-4)}`,
        game: "Free Fire MAX",
        category: category || "Clash Squad",
        type: type || "Solo",
        format: format || "1v1",
        mode: mode || "Classic",
        platform: "Mobile Only",
        map: map || "Bermuda",
        allowedWeapons: Array.isArray(allowedWeapons) ? allowedWeapons.join(", ") : allowedWeapons || null,
        rules: rules || null,
        status: "upcoming",
        prizePool: Number(prizePool) || 0,
        winnerPrize: Number(winnerPrize) || Number(prizePool) || 0,
        perKill: Number(perKill) || 0,
        entryFee: Number(entryFee) || 0,
        entryFeeModel: entryFeeModel || "PLAYER_ENTRY",
        matchType: matchType || "SINGLE_MATCH",
        maxTeams: maxTeams ? Number(maxTeams) : null,
        teamSize: teamSize ? Number(teamSize) : 1,
        totalSlots: Number(totalSlots) || 48,
        slotsFilled: 0,
        startTime: parsedStartTime,
        matchDate: matchDate || null,
        matchTime: matchTime || null,
        isFeatured: Boolean(isFeatured),
        bannerUrl: bannerUrl || null,
        prizesJson: prizesJson ? (typeof prizesJson === "string" ? prizesJson : JSON.stringify(prizesJson)) : null,
        roomId: roomId || null,
        roomPassword: roomPassword || null,
      },
    });

    return NextResponse.json({ success: true, message: "Tournament created.", data: created });
  } catch (error: any) {
    console.error("Admin tournament creation error:", error);
    return NextResponse.json({ success: false, error: error?.message || "Server error." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...fields } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Tournament ID is required." }, { status: 400 });
    }

    // Build update payload using only columns that exist in the schema
    const updateData: Record<string, any> = {};

    if (fields.title !== undefined) updateData.title = fields.title.trim().toUpperCase();
    if (fields.category !== undefined) updateData.category = fields.category;
    if (fields.type !== undefined) updateData.type = fields.type;
    if (fields.format !== undefined) updateData.format = fields.format;
    if (fields.mode !== undefined) updateData.mode = fields.mode;
    if (fields.map !== undefined) updateData.map = fields.map;
    if (fields.allowedWeapons !== undefined) {
      updateData.allowedWeapons = Array.isArray(fields.allowedWeapons)
        ? fields.allowedWeapons.join(", ")
        : fields.allowedWeapons || null;
    }
    if (fields.rules !== undefined) {
      updateData.rules = Array.isArray(fields.rules)
        ? fields.rules.join("\n")
        : fields.rules || null;
    }
    if (fields.status !== undefined) updateData.status = fields.status;
    if (fields.prizePool !== undefined) updateData.prizePool = Number(fields.prizePool);
    if (fields.winnerPrize !== undefined) updateData.winnerPrize = Number(fields.winnerPrize);
    if (fields.perKill !== undefined) updateData.perKill = Number(fields.perKill);
    if (fields.entryFee !== undefined) updateData.entryFee = Number(fields.entryFee);
    if (fields.totalSlots !== undefined) updateData.totalSlots = Number(fields.totalSlots);
    if (fields.matchDate !== undefined) updateData.matchDate = fields.matchDate;
    if (fields.matchTime !== undefined) updateData.matchTime = fields.matchTime;
    if (fields.startTime !== undefined) {
      const d = new Date(fields.startTime);
      if (!isNaN(d.getTime())) {
        updateData.startTime = d;
      }
    }

    // bannerUrl is the DB column — mapped from bannerImage on the front-end
    if (fields.bannerUrl !== undefined) updateData.bannerUrl = fields.bannerUrl || null;
    if (fields.roomId !== undefined) updateData.roomId = fields.roomId || null;
    if (fields.roomPassword !== undefined) updateData.roomPassword = fields.roomPassword || null;
    if (fields.prizesJson !== undefined) {
      updateData.prizesJson = fields.prizesJson
        ? (typeof fields.prizesJson === "string" ? fields.prizesJson : JSON.stringify(fields.prizesJson))
        : null;
    }
    if (fields.isFeatured !== undefined) updateData.isFeatured = Boolean(fields.isFeatured);
    // youtubeUrl for live stream
    if (fields.liveStreamUrl !== undefined) updateData.youtubeUrl = fields.liveStreamUrl || null;

    const updated = await prisma.tournament.update({ where: { id }, data: updateData });
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    console.error("Admin tournament update error:", error);
    return NextResponse.json({ success: false, error: error?.message || "Server error." }, { status: 500 });
  }
}

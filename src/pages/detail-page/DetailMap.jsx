import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Map, MapMarker, ZoomControl } from "react-kakao-maps-sdk";
import { fetchMapData } from "../../api/detailApi";

const DetailMap = ({ detailData }) => {
  const placeId = detailData?.mt10id;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["mapData", placeId],
    queryFn: () => fetchMapData(placeId),
    enabled: !!placeId,
  });

  const mapData = data?.dbs?.db;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (!mapData) {
    return <div>장소 정보가 없습니다.</div>;
  }

  return (
    <div>
      <h4 className="font-extrabold text-3xl mb-8">장소</h4>
      <p className="mb-8">{mapData.adres || "주소 정보가 없습니다."}</p>
      {mapData.telno && (
        <div>
          <h4 className="font-extrabold text-3xl mb-8">문의</h4>
          <p className="mb-8">{mapData.telno}</p>
        </div>
      )}
      {!mapData.telno && <p>문의처 정보가 없습니다.</p>}

      <Map
        center={{ lat: mapData.la, lng: mapData.lo }}
        style={{ width: "100%", height: "500px" }}
        level={3}
      >
        <MapMarker position={{ lat: mapData.la, lng: mapData.lo }} />
        <ZoomControl />
      </Map>
    </div>
  );
};

export default DetailMap;

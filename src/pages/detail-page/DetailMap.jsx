import React, { useEffect, useRef } from "react";
import useKopisStore from "../../zustand/useKopisStore";

const DetailMap = () => {
  const mapRef = useRef(null);

  // 공연 장소 가져오기
  const { fetchMapData, mapData, data } = useKopisStore((state) => ({
    fetchMapData: state.fetchMapData,
    mapData: state.mapData,
    data: state.data,
  }));

  // 상세페이지 정보에서 공연장소id 뽑아내기
  const placeId = data.mt10id;
  // 공연 장소 첫화면에 불러오기
  useEffect(() => {
    fetchMapData(placeId);
  }, [fetchMapData, placeId]);

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      const mapContainer = mapRef.current;
      const mapOption = {
        center: new window.kakao.maps.LatLng(mapData.la, mapData.lo), // 지도의 중심 좌표
        level: 3, // 지도의 확대 레벨
      };

      // 지도 생성
      const map = new window.kakao.maps.Map(mapContainer, mapOption);

      // 마커 위치 설정
      const markerPosition = new window.kakao.maps.LatLng(
        mapData.la,
        mapData.lo
      );

      // 마커 생성
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });

      // 마커를 지도에 표시
      marker.setMap(map);

      // 인포윈도우 설정
      const infowindow = new window.kakao.maps.InfoWindow({
        content: '<div style="padding:5px;">여기에 위치</div>', // 인포윈도우 내용
      });

      // 마커 클릭 시 인포윈도우 표시
      window.kakao.maps.event.addListener(marker, "click", () => {
        infowindow.open(map, marker);
      });
    } else {
      console.error("Kakao maps SDK not loaded");
    }
  }, []);

  // mapData가 null 또는 undefined인지 확인
  if (!mapData) {
    return (
      <div>
        <h4 className="font-extrabold text-3xl mb-8">장소 정보가 없습니다.</h4>
      </div>
    );
  }

  return (
    <>
      <h4 className="font-extrabold text-3xl mb-8">장소</h4>
      {mapData.adres && <p className="mb-8">{mapData.adres}</p>}

      {mapData.telno && (
        <div>
          <p className="font-extrabold text-3xl mb-8">문의</p>
          <p className="mb-8">{mapData.telno}</p>
        </div>
      )}
      <div ref={mapRef} style={{ width: "100%", height: "400px" }}>
        {/* 지도 표시 */}
      </div>
    </>
  );
};

export default DetailMap;

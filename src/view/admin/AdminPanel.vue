<template>
  <AdminNavBar/>
  <h2>Les statistiques</h2>
  <div class="stat-container">
    <div class="stat-count">
      <div>
        <p>450</p>
        <font-awesome-icon icon="fa-solid fa-user" size="2x" style="color: #000000;" />
      </div>
      <h3>Utilisateurs</h3>
    </div>
    <div id="graph-container-1">
      <div id="chart-1" class="graphic">
        <svg ref="svg" width="0" height="0"></svg>
      </div>
    </div>
  </div>
  <div class="stat-container">
    <div class="stat-count">
      <div>
        <p>95</p>
        <font-awesome-icon icon="fa-solid fa-car" size="2x" style="color: #000000;" />
      </div>
      <h3>Utilisateurs</h3>
    </div>
    <div id="graph-container-2" style="display: flex; justify-content: center">
      <div id="chart-2" class="graphic">
        <svg ref="svg" width="0" height="0"></svg>
      </div>
    </div>
  </div>
  <Footer/>
</template>

<script>
import Footer from "@/components/Footer.vue";
import AdminNavBar from "@/components/admin/AdminNavBar.vue";
import * as d3 from "d3";

export default {
  name: "AdminPanel",
  components: {AdminNavBar, Footer},
  mounted() {
    this.createChart1();
    this.createChart2();
  },
  methods: {
    createChart1() {
      const data = [
        { x: "13/04/23", y: 15 },
        { x: "Février", y: 25 },
        { x: "Mars", y: 35 },
        { x: "Avril", y: 20 },
        { x: "Octobre", y: 35 },
        { x: "Aout", y: 20 },
        { x: "Mai", y: 30 }
      ];

      const margin = { top: 20, right: 20, bottom: 50, left: 70 };
      const width = 420 - margin.left - margin.right;
      const height = 300 - margin.top - margin.bottom;

      const svg = d3
          .select('#chart-1')
          .append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      const xScale = d3
          .scaleBand()
          .range([0, width])
          .domain(data.map((d) => d.x))
          .padding(0.4);

      const yScale = d3
          .scaleLinear()
          .range([height, 0])
          .domain([0, d3.max(data, (d) => d.y)]);

      svg.append('g')
          .attr('transform', 'translate(0,' + height + ')')
          .call(d3.axisBottom(xScale));

      svg.append('g').call(d3.axisLeft(yScale));

      svg.selectAll('rect')
          .data(data)
          .enter()
          .append('rect')
          .attr('x', (d) => xScale(d.x))
          .attr('y', (d) => yScale(d.y))
          .attr('width', xScale.bandwidth())
          .attr('height', (d) => height - yScale(d.y))
          .attr('fill', '#8bc34a');
    },
    createChart2() {
      const data2 = [
        { x: "13/04/23", y: 15 },
        { x: "Février", y: 25 },
        { x: "Mars", y: 35 },
        { x: "Avril", y: 20 },
        { x: "Octobre", y: 35 },
        { x: "Aout", y: 20 },
        { x: "Mai", y: 30 }
      ];

      const margin = { top: 20, right: 20, bottom: 50, left: 70 };
      const width = 420 - margin.left - margin.right;
      const height = 300 - margin.top - margin.bottom;

      const svg = d3
          .select('#chart-2')
          .append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      const xScale = d3
          .scaleBand()
          .range([0, width])
          .domain(data2.map((d) => d.x))
          .padding(0.4);

      const yScale = d3
          .scaleLinear()
          .range([height, 0])
          .domain([0, d3.max(data2, (d) => d.y)]);

      svg.append("g")
          .attr("transform", `translate(0, ${height})`)
          .call(d3.axisBottom(xScale))
          .selectAll("text")

      svg.append("g")
          .call(d3.axisLeft(yScale));

      svg.selectAll("rect")
          .data(data2)
          .enter()
          .append("rect")
          .attr("x", d => xScale(d.x))
          .attr("y", d => yScale(d.y))
          .attr("width", xScale.bandwidth())
          .attr("height", d => height - yScale(d.y))
          .attr("fill", "#8bc34a");
    }
  }
}
</script>

<style scoped>
  h2 {
    text-align: center;
    font-size: 1.7rem;
  }
  h3 {
    margin: 0;
    font-size: 1.5rem;
  }
  .stat-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
  .stat-count {
    display: flex;
    align-items: center;
    border: 4px solid #8bc34a;
    width: 320px;
    height: 200px;
    margin: 10px;
    border-radius: 15px;
    justify-content: center;
    flex-direction: column;
  }
  .stat-count div {
    display: flex;
    align-items: center;
  }
  .stat-count p {
    font-size: 2.5rem;
    font-weight: 800;
    margin: 10px;
    position: relative;
  }
  .graphic {
    display: flex;
  }
  @media screen and (max-width: 399px) {
    .graphic {
      display: none;
    }
  }
</style>